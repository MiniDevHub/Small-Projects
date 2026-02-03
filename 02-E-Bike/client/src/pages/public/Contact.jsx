import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "@/components/common/FormField";
import toast from "react-hot-toast";

const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Future: Send to backend API
    console.log("Contact form:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully! We will get back to you soon.");
    reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 7980598210",
      link: "tel:+917980598210",
    },
    {
      icon: Mail,
      title: "Email",
      value: "enicontrol@yahoo.com",
      link: "mailto:enicontrol@yahoo.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Pan-India Network",
      link: null,
    },
    {
      icon: Clock,
      title: "Hours",
      value: "Mon-Sat: 9AM - 7PM",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Contact Us</h1>
            <p className="max-w-2xl mx-auto text-xl text-primary-100">
              Have questions? We're here to help you find the perfect electric
              bike
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Get in Touch
            </h2>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary-100">
                        <info.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-600">
                          {info.title}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="font-semibold text-gray-900 hover:text-primary-600"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-gray-900">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center bg-gray-200 rounded-lg aspect-video">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      label="Full Name"
                      placeholder="John Doe"
                      error={errors.name?.message}
                      {...register("name")}
                      required
                    />
                    <FormField
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register("email")}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      label="Phone"
                      type="tel"
                      placeholder="9876543210"
                      error={errors.phone?.message}
                      {...register("phone")}
                      required
                    />
                    <FormField
                      label="Subject"
                      placeholder="Product Inquiry"
                      error={errors.subject?.message}
                      {...register("subject")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      className="flex w-full px-3 py-2 text-sm transition-colors bg-white border border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your inquiry..."
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
