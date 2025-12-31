import { useState } from "react";
import { Edit } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Tax } from "@/types";
import { EditCustomerModal } from "./EditCustomerModal";

interface TaxTableProps {
    data: Tax[];
}

export function TaxTable({ data }: TaxTableProps) {
    const [editingTax, setEditingTax] = useState<Tax | null>(null);

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Entity</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Request Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((tax) => (
                                <TableRow key={tax.id}>
                                    <TableCell className="font-medium">{tax.id}</TableCell>
                                    <TableCell>{tax.entity}</TableCell>

                                    {/* FIX: Show normalizedCountry if available, otherwise raw country */}
                                    <TableCell>
                                        {tax.normalizedCountry ? tax.normalizedCountry : tax.country}
                                    </TableCell>

                                    <TableCell>{tax.gender}</TableCell>
                                    <TableCell>
                                        {new Date(tax.requestDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setEditingTax(tax)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {editingTax && (
                <EditCustomerModal
                    tax={editingTax}
                    open={!!editingTax}
                    onOpenChange={(open) => {
                        if (!open) setEditingTax(null);
                    }}
                />
            )}
        </>
    );
}