export const env = {
  vercelRebuildWebhookUrl: process.env.SANITY_STUDIO_VERCEL_REBUILD_WEBHOOK_URL!,
  vercelToken: process.env.SANITY_STUDIO_VERCEL_TOKEN!,
  vercelProjectId: process.env.SANITY_STUDIO_VERCEL_PROJECT_ID!,
  vercelTeamId: process.env.SANITY_STUDIO_VERCEL_TEAM_ID!,
};

type VercelDeployment = {
  uid: string;
  state: 'BUILDING' | 'READY' | 'ERROR' | 'QUEUED' | string;
};
type CustomError = {
  title: string;
  description?: string;
};

const vercelApiCommonParams = {
  teamId: env.vercelTeamId,
  projectId: env.vercelProjectId,
};

export const getIsVercelIntegrationEnabled = (): boolean => {
  return Object.values(env).every(Boolean);
};

export const getActiveDeployments = async (): Promise<{
  deployments: VercelDeployment[];
  error: CustomError | null;
}> => {
  const params = new URLSearchParams({
    ...vercelApiCommonParams,
    limit: '50',
    state: 'BUILDING,QUEUED',
  });

  try {
    const result = await fetch(`https://api.vercel.com/v6/deployments?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${env.vercelToken}`,
      },
    });

    const response = await result.json();

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { deployments: response.deployments, error: null };
  } catch (error) {
    return { deployments: [], error: { title: 'Failed to get active deployments', description: error?.message } };
  }
};

export const getHasActiveDeployments = async (): Promise<boolean> => {
  const { deployments } = await getActiveDeployments();

  return deployments.length > 0;
};

export const cancelDeployment = async (
  deploymentId: string,
): Promise<{ deployments: VercelDeployment[]; error: CustomError | null }> => {
  const params = new URLSearchParams({
    ...vercelApiCommonParams,
  });

  try {
    const result = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}?${params.toString()}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${env.vercelToken}`,
      },
    });

    const response = await result.json();

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (error) {
    return { deployments: [], error: { title: 'Failed to cancel deployment', description: error?.message } };
  }
};

export const cancelDeployments = async (deployments: VercelDeployment[]) => {
  return Promise.all(deployments.map((deployment) => cancelDeployment(deployment.uid)));
};

export const rebuildPreview = async (): Promise<{ error: CustomError | null }> => {
  try {
    const result = await fetch(env.vercelRebuildWebhookUrl, {
      method: 'POST',
    });

    const response = await result.json();

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { error: null };
  } catch (error) {
    return { error: { title: 'Failed to rebuild preview', description: error?.message } };
  }
};
