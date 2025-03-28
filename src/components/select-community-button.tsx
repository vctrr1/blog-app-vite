import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Community } from "./communities-list";

interface SelectCommunityButtonProps {
  onSelectCategory: (value: string) => void;
  communities: Community[];
}

export function SelectCommunityButton({
  onSelectCategory,
  communities,
}: SelectCommunityButtonProps) {
  return (
    <Select onValueChange={onSelectCategory}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione uma comunidade (opcional)" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Comunidaes</SelectLabel>
          {communities.map((community) => (
            <SelectItem key={community.id} value={String(community.id)}>
              {community.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
