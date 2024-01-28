import React from 'react';
import { DocumentActionComponent } from 'sanity';
import { RefreshIcon } from '@sanity/icons';
import { useToast } from '@sanity/ui';
import {
  cancelDeployments,
  getActiveDeployments,
  getIsVercelIntegrationEnabled,
  rebuildPreview,
} from '../integrations/vercel';

// Sanity action that uses vercel webhook to trigger rebuild
export const RebuildPreview: DocumentActionComponent = (props) => {
  const toast = useToast();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const defaultConfirmMessage = 'Are you sure you want to rebuild preview?';
  const [confirmMessage, setConfirmMessage] = React.useState(defaultConfirmMessage);

  if (!getIsVercelIntegrationEnabled() || !props.draft || props.type !== 'post' || !props.draft.isReadyForPreview) {
    return null;
  }

  const onHandle = async () => {
    const { deployments, error } = await getActiveDeployments();

    if (error) {
      return toast.push({
        status: 'error',
        title: error.title,
        description: error.description,
      });
    }

    deployments.length &&
      setConfirmMessage(
        `There are ${deployments.length} active deployments. Do you want to cancel them and rebuild preview?`,
      );
    setDialogOpen(true);
  };

  const onCancel = () => {
    setDialogOpen(false);
    setConfirmMessage(defaultConfirmMessage);
  };

  const onConfirm = async () => {
    const { deployments, error } = await getActiveDeployments();

    if (error) {
      return toast.push({
        status: 'error',
        title: error.title,
        description: error.description,
      });
    }

    const canceledDeployments = await cancelDeployments(deployments);

    const errorDeployments = canceledDeployments.filter((deployment) => deployment.error);

    errorDeployments.length &&
      toast.push({
        status: 'error',
        title: `${errorDeployments.length} deployments failed to cancel`,
        description: errorDeployments.map((deployment) => deployment.error?.message).join(', '),
      });

    const successDeployments = canceledDeployments.filter((deployment) => !deployment.error);

    successDeployments.length &&
      toast.push({
        status: 'success',
        title: `${successDeployments.length} deployments canceled`,
      });

    await rebuildPreview();

    toast.push({
      status: 'success',
      title: 'Preview will be rebuilt',
    });

    props.onComplete();
  };

  return {
    icon: RefreshIcon,
    label: 'Rebuild Preview',
    onHandle,
    dialog: dialogOpen && {
      type: 'confirm',
      message: confirmMessage,
      onConfirm,
      onCancel,
    },
  };
};
