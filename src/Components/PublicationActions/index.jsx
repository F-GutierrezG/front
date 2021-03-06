import React from "react";
import PropTypes from "prop-types";

import withErrors from "Components/withErrors";

import LinkPublicationDialog from "./LinkPublicationDialog";
import ViewPublicationDialog from "./ViewPublicationDialog";
import CreatePublicationDialog from "./CreatePublicationDialog";
import EditPublicationDialog from "./EditPublicationDialog";
import RejectPublicationDialog from "./RejectPublicationDialog";
import DeletePublicationDialog from "./DeletePublicationDialog";
import ClonePublicationDialog from "./ClonePublicationDialog";

const PublicationActions = props => {
  return (
    <div>
      <ClonePublicationDialog
        open={props.openClonePublication}
        errors={props.clonePublicationErrors}
        buttonsDisabled={props.buttonsDisabled}
        onCancel={props.onCancelClone}
        onAccept={props.onAcceptClone}
        periodicities={props.clonePeriodicities}
        durations={props.cloneDurations}
        clone={props.clone}
        onChange={props.onChangeClone}
      />
      <LinkPublicationDialog
        open={props.openLinkPublication}
        link={props.link}
        errors={props.linkPublicationErrors}
        onChange={props.onChangeLink}
        buttonsDisabled={props.buttonsDisabled}
        onCancel={props.onCancelLink}
        onAccept={props.onAcceptLink}
      />
      <CreatePublicationDialog
        open={props.openCreatePublication}
        publication={props.createPublication}
        tag={props.tag}
        errors={props.createPublicationErrors}
        socialNetworks={props.socialNetworks}
        onChange={props.onChangeCreate}
        onChangeTag={props.onChangeTag}
        onTagKeyPress={props.onTagKeyPress}
        onCancel={props.onCancelCreate}
        onAccept={props.onAcceptCreate}
        buttonsDisabled={props.buttonsDisabled}
        onDeleteTag={props.onDeleteTag}
        companies={props.companies}
        brands={props.brands}
        categories={props.categories}
        subcategories={props.subcategories}
      />
      <ViewPublicationDialog
        open={props.openViewPublication}
        publication={props.selectedPublication}
        socialNetworks={props.socialNetworks}
        onClose={props.onCloseViewPublication}
        onReject={props.onRejectViewPublication}
        onAccept={props.onAcceptViewPublication}
        onCancelReject={props.onCancelRejectViewPublication}
        onAcceptReject={props.onAcceptRejectViewPublication}
        rejecting={props.rejecting}
        onChangeReject={props.onChangeReject}
        rejectReason={props.rejectReason}
        onLink={props.onLinkPublication}
        onClone={props.onClonePublication}
        onEdit={props.onEditPublication}
        onDelete={props.onDeletePublication}
      />
      <EditPublicationDialog
        open={props.openEditPublication}
        publication={props.selectedPublication}
        errors={props.editPublicationErrors}
        socialNetworks={props.socialNetworks}
        onCancel={props.onCancelEdit}
        onAccept={props.onAcceptEdit}
        buttonsDisabled={props.buttonsDisabled}
        onChange={props.onChangeEdit}
        onChangeTag={props.onChangeTag}
        onTagKeyPress={props.onEditTagKeyPress}
        tag={props.tag}
        onDeleteTag={props.onEditDeleteTag}
        companies={props.companies}
        brands={props.brands}
        categories={props.categories}
        subcategories={props.subcategories}
      />
      <DeletePublicationDialog
        open={props.openDeletePublication}
        onCancel={props.onCancelDelete}
        onAccept={props.onAcceptDelete}
        buttonsDisabled={props.buttonsDisabled}
      />
      <RejectPublicationDialog
        open={props.rejecting}
        onCancelReject={props.onCancelRejectViewPublication}
        onAcceptReject={props.onAcceptRejectViewPublication}
        onChangeReject={props.onChangeReject}
        rejectReason={props.rejectReason}
        buttonsDisabled={props.buttonsDisabled}
        errors={props.rejectPublicationErrors}
      />
    </div>
  );
};

PublicationActions.propTypes = {
  openLinkPublication: PropTypes.bool.isRequired,
  openCreatePublication: PropTypes.bool.isRequired,
  openEditPublication: PropTypes.bool.isRequired,
  openDeletePublication: PropTypes.bool.isRequired,
  openClonePublication: PropTypes.bool.isRequired,
  createPublication: PropTypes.object.isRequired,
  createPublicationErrors: PropTypes.object.isRequired,
  socialNetworks: PropTypes.array.isRequired,
  onChangeCreate: PropTypes.func.isRequired,
  onCancelCreate: PropTypes.func.isRequired,
  onAcceptCreate: PropTypes.func.isRequired,
  buttonsDisabled: PropTypes.bool.isRequired,
  openViewPublication: PropTypes.bool.isRequired,
  selectedPublication: PropTypes.object.isRequired,
  onCloseViewPublication: PropTypes.func.isRequired,
  onRejectViewPublication: PropTypes.func.isRequired,
  onAcceptViewPublication: PropTypes.func.isRequired,
  onLinkPublication: PropTypes.func.isRequired,
  onEditPublication: PropTypes.func.isRequired,
  onClonePublication: PropTypes.func.isRequired,
  onDeletePublication: PropTypes.func.isRequired,
  onCancelRejectViewPublication: PropTypes.func.isRequired,
  onAcceptRejectViewPublication: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onSelectSlot: PropTypes.func.isRequired,
  eventColors: PropTypes.func.isRequired,
  rejecting: PropTypes.bool.isRequired,
  onChangeReject: PropTypes.func.isRequired,
  rejectReason: PropTypes.string.isRequired,
  onCancelDelete: PropTypes.func.isRequired,
  onAcceptDelete: PropTypes.func.isRequired,
  editPublicationErrors: PropTypes.object.isRequired,
  linkPublicationErrors: PropTypes.object.isRequired,
  clonePublicationErrors: PropTypes.object.isRequired,
  rejectPublicationErrors: PropTypes.object.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onAcceptEdit: PropTypes.func.isRequired,
  onChangeEdit: PropTypes.func.isRequired,
  onChangeLink: PropTypes.func.isRequired,
  onCancelClone: PropTypes.func.isRequired,
  onAcceptClone: PropTypes.func.isRequired,
  link: PropTypes.string,
  clone: PropTypes.shape({
    periodicity: PropTypes.string,
    duration: PropTypes.string
  }).isRequired,
  onCancelLink: PropTypes.func.isRequired,
  onAcceptLink: PropTypes.func.isRequired,
  onChangeTag: PropTypes.func.isRequired,
  onTagKeyPress: PropTypes.func.isRequired,
  onEditTagKeyPress: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
  onEditDeleteTag: PropTypes.func.isRequired,
  clonePeriodicities: PropTypes.array.isRequired,
  cloneDurations: PropTypes.array.isRequired,
  onChangeClone: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  subcategories: PropTypes.array
};

export default withErrors(PublicationActions);
