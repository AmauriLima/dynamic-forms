
import { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { ThemeProvider } from "./app/contexts/theme-provider";
import { cn } from "./app/lib/utils";
import { FeatureItem } from "./components/feature-item";
import { Button } from "./components/ui/button";

export interface IFeature {
  feature: string;
}

export interface ICpf {
  cpfs: string[];
}

export interface FormData {
  features: {
    feature: string;
    cpfs: { cpf: string }[];
  }[];
}

export function App() {
  const form = useForm<FormData>({
    defaultValues: {
      features: [
        {
          feature: '',
          cpfs: [
            {
              cpf: '',
            },
            {
              cpf: '',
            }
          ]
        },
        {
          feature: '',
          cpfs: [
            {
              cpf: '',
            },
            {
              cpf: '',
            }
          ]
        },
      ]
    }
  });

  const features = useFieldArray({
    control: form.control,
    name: 'features'
  });

  const handleSubmit = form.handleSubmit(formData => {
    console.log(formData);
  })

  console.log('renderizou o formulário');


  useEffect(() => {
    const { unsubscribe } = form.watch((formData, { name }) => {
      if (!name) return;
      const [_, featureIndex, keyName] = name.split('.');
      if (keyName !== 'feature') return;

      const formDataFeatures = formData.features;
      const featureValue = formDataFeatures?.[+featureIndex]?.feature?.trim();

      if (formDataFeatures && +featureIndex === formDataFeatures.length - 2) {
        features.append({ feature: '', cpfs: [{ cpf: '' }, { cpf: '' }] });
      }

      if (featureValue === 'default') {
        features.remove(+featureIndex);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [form.watch]);


  return (
    <ThemeProvider>
      <div className="grid place-items-center min-h-screen">
        <div className="w-full max-w-2xl">

          <h1 className="text-2xl font-semibold tracking-tight mb-6">Features</h1>

          <FormProvider {...form} >
            <form onSubmit={handleSubmit} className="mt-10">
              <div className='space-y-4 p-2 h-[600px] overflow-auto scrollbar-track-transparent scrollbar-thumb-white scrollbar-thin'>
                {features.fields.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={cn(
                      "flex gap-4 transition-opacity flex-col",
                    )}
                  >
                    <FeatureItem index={index} isLast={features.fields.length - 1 === index} />
                  </div>
                ))}

              </div>

              <Button type="submit" className="w-full mt-6">Enviar</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </ThemeProvider>
  )
};
