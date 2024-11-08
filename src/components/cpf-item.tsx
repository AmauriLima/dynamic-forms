import { FormData } from "@/app";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";

interface Props {
  featureIndex: number;
  cpfIndex: number;
  isLastFeature: boolean;
  isLastCpf: boolean;
}

const CpfItemMemo = ({ isLastFeature, cpfIndex, featureIndex, isLastCpf }: Props) => {
  const form = useFormContext<FormData>();

  return (
    <Input
      className="transition-all"
      placeholder="CPF"
      {...form.register(`features.${featureIndex}.cpfs.${cpfIndex}.cpf`)}
      disabled={isLastFeature || isLastCpf}
    />

  );
}

export const CpfItem = memo(CpfItemMemo);
