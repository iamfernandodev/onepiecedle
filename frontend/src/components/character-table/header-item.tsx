interface HeaderItemProps {
    name: string;
}

export function CharactersHeaderItem({ name }: HeaderItemProps) {
    return (
        <th className="max-w-16 space-y-2 pb-1">
            <span>{name.toLocaleUpperCase()}</span>
            <div className="h-[0.5px] w-full bg-slate-500"></div>
        </th>
    )
}