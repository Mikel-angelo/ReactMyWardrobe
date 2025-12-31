import { useState } from "react";
import type { Location } from "@/types/index";

export type LocationDialogs = {
  selectedLocation: Location | null;
  locationDialogOpen: boolean;
  locationDeleteDialogOpen: boolean;
  locationToDelete: Location | null;
  openLocationDetails: (location: Location) => void;
  closeLocationDetails: () => void;
  requestDelete: (location: Location) => void;
  clearDeleteRequest: () => void;
  resetAfterDelete: () => void;
};

export function useLocationDialogs(): LocationDialogs {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [locationDeleteDialogOpen, setLocationDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);

  const openLocationDetails = (location: Location) => {
    setSelectedLocation(location);
    setLocationDialogOpen(true);
  };

  const closeLocationDetails = () => setLocationDialogOpen(false);

  const requestDelete = (location: Location) => {
    setLocationToDelete(location);
    setLocationDeleteDialogOpen(true);
  };

  const clearDeleteRequest = () => {
    setLocationDeleteDialogOpen(false);
    setLocationToDelete(null);
  };

  const resetAfterDelete = () => {
    clearDeleteRequest();
    setLocationDialogOpen(false);
    setSelectedLocation(null);
  };

  return {
    selectedLocation,
    locationDialogOpen,
    locationDeleteDialogOpen,
    locationToDelete,
    openLocationDetails,
    closeLocationDetails,
    requestDelete,
    clearDeleteRequest,
    resetAfterDelete,
  };
}
