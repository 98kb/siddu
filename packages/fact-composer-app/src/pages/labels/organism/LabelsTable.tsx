import {LabelSchema} from "@repo/collection-service-defs";
import {Reader} from "fp-ts/lib/Reader";
import {TrashIcon} from "lucide-react";
import {ComponentProps} from "react";
import {WithConfirmation} from "~/components/HOC/WithConfirmation";
import {IconButton} from "~/components/IconButton";
import {Pill} from "~/components/Pill";
import {Table, TableBody, TableCell, TableRow} from "~/components/ui/table";

type TProps = {
  labels: LabelSchema[];
  onDelete: Reader<LabelSchema["_id"], unknown>;
};

export function LabelsTable({labels, onDelete}: TProps) {
  return (
    <Table className="min-w-[500px] w-full">
      <TableBody>
        {labels.map(label => (
          <TableRow key={label._id} className="group">
            <TableCell className="font-medium">
              <Pill name={label.name} variant="outline" />
            </TableCell>
            <TableCell
              align="right"
              className="group-hover:opacity-100 opacity-0 transition-opacity"
            >
              <WithConfirmation
                For={DeleteButton}
                onConfirm={() => onDelete(label._id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DeleteButton(
  props: Pick<ComponentProps<typeof IconButton>, "onClick">,
) {
  return (
    <IconButton tooltip="Delete" {...props}>
      <TrashIcon className="w-4" />
    </IconButton>
  );
}
