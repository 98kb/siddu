import {Label} from "@repo/facts-db";
import {TrashIcon} from "lucide-react";
import {WithConfirmation} from "~/components/HOC/WithConfirmation";
import {IconButton} from "~/components/IconButton";
import {Pill} from "~/components/Pill";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

type TProps = {
  labels: Label[];
  onDelete: (labelId: number) => Promise<void>;
};

export function LabelsTable({labels, onDelete}: TProps) {
  return (
    <Table className="min-w-[500px] w-full">
      <TableCaption>A list of labels.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">
            {labels.length} Labels
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {labels.map(label => (
          <TableRow key={label.id}>
            <TableCell className="font-medium">
              <Pill name={label.name} variant="outline" />
            </TableCell>
            <TableCell align="right">
              <WithConfirmation
                For={DeleteButton}
                onConfirm={() => onDelete(label.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DeleteButton(props: {onClick: () => void}) {
  return (
    <IconButton tooltip="Delete" {...props}>
      <TrashIcon className="w-4" />
    </IconButton>
  );
}
