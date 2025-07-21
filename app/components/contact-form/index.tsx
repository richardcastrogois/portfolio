//app/components/contact-form/index.tsx

"use client";

import { HiArrowNarrowRight } from "react-icons/hi";
import { SectionTitle } from "../section-title";
import { Button } from "../button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { techBadgeAnimation } from "@/app/lib/animations";
import { useTranslations } from "@/app/hook/useTranslations";

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
  const t = useTranslations();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post("/api/contact", data);
      toast.success(t.contact_form_toast_success);
      reset();
    } catch {
      toast.error(t.contact_form_toast_error);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-6 md:py-32 flex items-center justify-center bg-gray-950"
    >
      <div className="w-full max-w-[420px] mx-auto">
        <SectionTitle
          subtitle={t.contact_form_subtitle}
          title={t.contact_form_title}
          className="items-center text-center"
        />

        <motion.form
          className="mt-12 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          {...techBadgeAnimation}
          transition={{ duration: 0.4 }}
        >
          <input
            placeholder={t.contact_form_placeholder_name}
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-700"
            {...register("name")}
          />
          <input
            placeholder={t.contact_form_placeholder_email}
            type="email"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-700"
            {...register("email")}
          />
          <textarea
            placeholder={t.contact_form_placeholder_message}
            className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-700"
            maxLength={500}
            {...register("message")}
          />

          <Button
            className="w-max mx-auto mt-6 shadow-button"
            disabled={isSubmitting}
          >
            {t.contact_form_button_send}
            <HiArrowNarrowRight size={18} />
          </Button>
        </motion.form>
      </div>
    </section>
  );
};