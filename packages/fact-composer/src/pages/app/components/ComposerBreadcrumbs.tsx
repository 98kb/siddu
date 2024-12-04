import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

type TProps = {
  path: string;
};

export function ComposerBreadcrumbs({path}: TProps) {
  const pathList = toPathList(path);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathList.map((path, index) => (
          <>
            <BreadcrumbItem key={index} className="capitalize">
              {path}
            </BreadcrumbItem>
            {index < pathList.length - 1 && (
              <BreadcrumbSeparator key={`sep-${index}`} />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function toPathList(path: string): string[] {
  return path.split("/").filter(Boolean);
}
