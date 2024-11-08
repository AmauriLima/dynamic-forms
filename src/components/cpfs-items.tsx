import { FormData } from "@/app";
import { cn } from "@/app/lib/utils";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CpfItem } from "./cpf-item";

interface Props {
  isLastFeature: boolean;
  featureIndex: number;
}

export const CpfsItems = ({ isLastFeature, featureIndex }: Props) => {
  const form = useFormContext<FormData>();

  console.log('renderizou uma feature')

  const cpfs = useFieldArray({
    control: form.control,
    name: `features.${featureIndex}.cpfs`,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((formData, { name }) => {
      if (!name) return;
      const [_, featureIndex, keyName, cpfIndex] = name.split('.');

      if (keyName !== 'cpfs') return;

      const formdataCpfs = formData.features?.[+featureIndex]?.cpfs;
      const cpfValue = formdataCpfs?.[+cpfIndex]?.cpf?.trim();

      if (formdataCpfs && +cpfIndex === formdataCpfs.length - 2) {
        cpfs.append({ cpf: '' });
      }

      if (cpfValue === '') {
        cpfs.remove(+cpfIndex);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [form.watch]);


  return (
    <div className="flex-1 flex gap-4 px-4 ml-16">
      <span className={cn('py-2', isLastFeature && 'opacity-30')}>Cpfs</span>

      <div className="flex-1 space-y-2 max-h-80 scrollbar-thin p-2 overflow-auto scrollbar-track-transparent scrollbar-thumb-white">
        {cpfs.fields.map((cpf, cpfIndex) => (
          <div key={cpf.id}>
            <CpfItem
              isLastCpf={cpfs.fields.length - 1 === cpfIndex}
              isLastFeature={isLastFeature}
              cpfIndex={cpfIndex}
              featureIndex={featureIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

