export function DefaultBadge({ text }: { text: string }) {
  return (
    <div className="bg-muted/10 text-muted-foreground py-1 px-3 rounded-full w-fit text-sm h-fit border">
      {text}
    </div>
  );
}
