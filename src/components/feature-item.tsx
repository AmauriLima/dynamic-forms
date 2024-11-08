import { FormData } from "@/app"
import { cn } from "@/app/lib/utils"
import { SelectValue } from "@radix-ui/react-select"
import { Controller, useFormContext } from "react-hook-form"
import { CpfsItems } from "./cpfs-items"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"

interface IFeatureItemProps {
  isLast: boolean;
  index: number;
}

export function FeatureItem({ isLast, index }: IFeatureItemProps) {
  const form = useFormContext<FormData>();

  console.log('renderizou uma feature');

  return (
    <div
      className={cn(
        "flex gap-4 transition-opacity flex-col",
      )}
    >
      <div className="flex-1 flex items-between gap-4 flex-col">
        <div className="flex flex-1 px-6 flex-col space-y-2">

          <div className="flex gap-4 sticky top-0">
            <span className={cn(isLast && 'opacity-30')}>Módulo</span>
            <Controller
              control={form.control}
              name={`features.${index}.feature`}
              render={({ field }) => (
                <Select onValueChange={(value) => field.onChange(value)} disabled={isLast}>
                  <SelectTrigger>
                    <SelectValue placeholder='Módulo' />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="default">Selecione uma feature</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                    <SelectItem value="recarga">Recarga</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {!isLast && form.getValues(`features.${index}.feature`) && (
            <CpfsItems featureIndex={index} isLastFeature={isLast} />
          )}

        </div>
      </div>
    </div >
  )
}
