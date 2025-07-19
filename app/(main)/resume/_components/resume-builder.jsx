"use client";

import { saveResume } from "@/actions/resume";
import { resumeSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const ResumeBuilder = ({initialContent}) => {
    const[activeTab, setActiveTab] = useState("edit");

   const{
  control,
  register,
  handleSubmit,
  watch,
  formState: { errors},
   } = useForm({
        resolver:zodResolver(resumeSchema),
        defaultValues: {
         contactInfo: {},
         summary: "",
         skills: "",
         experience: [],
         education: [],
         projects: [],
    },
    });

    const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  return(
   <div className="space-y-4">
    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
            Resume Builder
            </h1>
            <div className="space-x-2">
                <Button variant="destructive">
                    <Save className="h-4 w-4" />
                    Save
                </Button>
                <Button>
                    <Download className="h-4 w-4" />
                    Download PDF
                </Button>
            </div>
    </div>
    <Tabs  value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="edit">Form</TabsTrigger>
    <TabsTrigger value="Preview">Markdown</TabsTrigger>
  </TabsList>
  <TabsContent value="edit">
    <form>
       <div>
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-2">
           <label className="text-sm font-medium">Email</label>
           <Input 
           {...register("contactInfo.email")}
           type="email"
           placeholder="your@email.com"
           error={errors.contactInfo?.email}
           /> 
           {errors.contactInfo?.email && (
            <p className="text-sm text-red-500">
                {errors.contactInfo.email.message}
            </p>

           )}
        </div>
        </div> 
        </div>
        
    </form>
    </TabsContent>
  <TabsContent value="preview">Change your password here.</TabsContent>
</Tabs>
  </div>
  );
  
};

export default ResumeBuilder;