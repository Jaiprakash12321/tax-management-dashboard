import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxApi } from "@/api/taxApi";
import type { Tax } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface EditCustomerModalProps {
  tax: Tax;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCustomerModal({ tax, open, onOpenChange }: EditCustomerModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Local state for the form fields
  const [formData, setFormData] = useState({
    entity: "",
    country: "",
    gender: "",
  });

  // Pre-fill the form when the modal opens
  useEffect(() => {
    if (tax) {
      setFormData({
        entity: tax.entity,
        country: tax.country,
        gender: tax.gender,
      });
    }
  }, [tax]);

  // Mutation to handle the API update
  const mutation = useMutation({
    mutationFn: (updatedData: typeof formData) => taxApi.updateTax(tax.id, updatedData),
    onSuccess: () => {
      // 1. Refresh the table data automatically
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
      // 2. Show success message
      toast({ title: "Success", description: "Record updated successfully." });
      // 3. Close the modal
      onOpenChange(false);
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to update record. Please try again.", 
        variant: "destructive" 
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Request</DialogTitle>
          <DialogDescription>
            Update the details for this tax request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entity" className="text-right">
                Entity
              </Label>
              <Input
                id="entity"
                value={formData.entity}
                onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Input
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}