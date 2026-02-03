import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Upload,
  X,
  Video,
  Image as ImageIcon,
  Loader2,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createProduct, updateProduct } from "@/api/productService";

const ProductForm = ({ product = null, onSuccess, onCancel }) => {
  const isEditMode = !!product;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Multiple images array with primary selection
  const [images, setImages] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [videoPreview, setVideoPreview] = useState("");

  // Unit states for specifications
  const [rangeUnit, setRangeUnit] = useState("km");
  const [speedUnit, setSpeedUnit] = useState("km/h");
  const [batteryVoltageUnit, setBatteryVoltageUnit] = useState("V");
  const [batteryCapacityUnit, setBatteryCapacityUnit] = useState("Ah");
  const [chargingUnit, setChargingUnit] = useState("hours");
  const [motorPowerUnit, setMotorPowerUnit] = useState("W");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [loadUnit, setLoadUnit] = useState("kg");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: product || {
      name: "",
      model: "",
      slug: "",
      description: "",
      category: "electric-scooter",
      base_price: "",
      dealer_price: "",
      mrp: "",
      tax_rate: "18",
      total_stock: "",
      low_stock_threshold: "10",
      is_available: true,
      is_featured: false,
      specifications: {
        range_value: "",
        battery_type: "Lithium-ion",
        battery_voltage: "",
        battery_capacity: "",
        top_speed_value: "",
        charging_time_value: "",
        motor_power_value: "",
        weight_value: "",
        load_capacity_value: "",
        colors: "",
      },
      warranty: {
        free_services: "4",
        warranty_period_months: "24",
        terms: "2 years warranty with 4 free services",
      },
      service_charges: {
        standard_service: "500",
        major_service: "1000",
        repair: "500",
        inspection: "300",
      },
    },
  });

  // Auto-generate slug from name
  const productName = watch("name");

  useEffect(() => {
    if (productName && !isEditMode) {
      const slug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("slug", slug);
    }
  }, [productName, setValue, isEditMode]);

  // Load existing images and parse specifications in edit mode
  useEffect(() => {
    if (isEditMode && product?.images) {
      const loadedImages = product.images.map((img) => ({
        url: img.url,
        alt: img.alt,
      }));
      setImages(loadedImages);

      const primaryIndex = product.images.findIndex((img) => img.is_primary);
      if (primaryIndex !== -1) {
        setPrimaryImageIndex(primaryIndex);
      }
    }

    if (isEditMode && product?.videos?.[0]) {
      setVideoPreview(product.videos[0]);
    }

    // Parse existing specifications to extract values and units
    if (isEditMode && product?.specifications) {
      const specs = product.specifications;

      // Parse range (e.g., "50-60 km" or "50 km")
      if (specs.range_km) {
        const rangeMatch = specs.range_km.match(
          /^([\d\-]+)\s*(km|miles?|KM)?/i,
        );
        if (rangeMatch) {
          setValue("specifications.range_value", rangeMatch[1]);
          if (rangeMatch[2]) {
            setRangeUnit(
              rangeMatch[2].toLowerCase().includes("mile") ? "miles" : "km",
            );
          }
        }
      }

      // Parse top speed (e.g., "50 km/h" or "50 mph")
      if (specs.top_speed) {
        const speedMatch = specs.top_speed.match(
          /^([\d\.]+)\s*(km\/h|mph|kmph)?/i,
        );
        if (speedMatch) {
          setValue("specifications.top_speed_value", speedMatch[1]);
          if (speedMatch[2]) {
            setSpeedUnit(
              speedMatch[2].toLowerCase().includes("mph") ? "mph" : "km/h",
            );
          }
        }
      }

      // Parse battery capacity (e.g., "48V 24Ah")
      if (specs.battery_capacity) {
        const batteryMatch = specs.battery_capacity.match(
          /^([\d\.]+)\s*V?\s*([\d\.]+)?\s*Ah?/i,
        );
        if (batteryMatch) {
          setValue("specifications.battery_voltage", batteryMatch[1]);
          if (batteryMatch[2]) {
            setValue("specifications.battery_capacity", batteryMatch[2]);
          }
        }
      }

      // Parse charging time (e.g., "4-5 hours" or "4 hours")
      if (specs.charging_time) {
        const chargingMatch = specs.charging_time.match(
          /^([\d\-\.]+)\s*(hours?|hrs?|minutes?|mins?)?/i,
        );
        if (chargingMatch) {
          setValue("specifications.charging_time_value", chargingMatch[1]);
          if (chargingMatch[2]) {
            setChargingUnit(
              chargingMatch[2].toLowerCase().includes("min")
                ? "minutes"
                : "hours",
            );
          }
        }
      }

      // Parse motor power (e.g., "1000W" or "1 kW")
      if (specs.motor_power) {
        const motorMatch = specs.motor_power.match(/^([\d\.]+)\s*(kW|W)?/i);
        if (motorMatch) {
          setValue("specifications.motor_power_value", motorMatch[1]);
          if (motorMatch[2]) {
            setMotorPowerUnit(
              motorMatch[2].toLowerCase() === "kw" ? "kW" : "W",
            );
          }
        }
      }

      // Parse weight (e.g., "80 kg" or "176 lbs")
      if (specs.weight) {
        const weightMatch = specs.weight.match(/^([\d\.]+)\s*(kg|lbs?)?/i);
        if (weightMatch) {
          setValue("specifications.weight_value", weightMatch[1]);
          if (weightMatch[2]) {
            setWeightUnit(
              weightMatch[2].toLowerCase().includes("lb") ? "lbs" : "kg",
            );
          }
        }
      }

      // Parse load capacity (e.g., "150 kg")
      if (specs.load_capacity) {
        const loadMatch = specs.load_capacity.match(/^([\d\.]+)\s*(kg|lbs?)?/i);
        if (loadMatch) {
          setValue("specifications.load_capacity_value", loadMatch[1]);
          if (loadMatch[2]) {
            setLoadUnit(
              loadMatch[2].toLowerCase().includes("lb") ? "lbs" : "kg",
            );
          }
        }
      }
    }
  }, [isEditMode, product, setValue]);

  // Handle multiple image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload only image files");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, { url: reader.result, alt: "" }]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove specific image
  const removeImage = (index) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      if (index === primaryImageIndex) {
        setPrimaryImageIndex(0);
      } else if (index < primaryImageIndex) {
        setPrimaryImageIndex(primaryImageIndex - 1);
      }
      return newImages;
    });
  };

  // Set primary image
  const setPrimaryImage = (index) => {
    setPrimaryImageIndex(index);
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please upload a video file");
      return;
    }

    const fileSizeInMB = file.size / 1024 / 1024;
    console.log(`📹 Video file selected: ${file.name}`);
    console.log(`📦 Original file size: ${fileSizeInMB.toFixed(2)} MB`);

    if (fileSizeInMB > 10) {
      const proceed = confirm(
        `⚠️ This video is ${fileSizeInMB.toFixed(2)} MB. Base64 encoding will make it even larger.\n\nRecommend using a video < 10MB.\n\nContinue anyway?`,
      );
      if (!proceed) {
        e.target.value = "";
        return;
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Video = reader.result;
      const base64SizeInMB = (base64Video.length * 3) / 4 / 1024 / 1024;
      console.log(
        `✅ Video converted to base64: ${base64SizeInMB.toFixed(2)} MB`,
      );
      setVideoPreview(base64Video);
    };
    reader.readAsDataURL(file);
  };

  // Submit form
  const onSubmit = async (formData) => {
    // Validate images (minimum 3 required)
    if (images.length < 3) {
      alert("Please upload at least 3 product images");
      return;
    }

    // Validate video (required)
    if (!videoPreview) {
      alert("Please upload a product video (Required)");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare images array with primary marking
      const processedImages = images.map((img, index) => ({
        url: img.url,
        alt: img.alt || `${formData.name} - View ${index + 1}`,
        is_primary: index === primaryImageIndex,
      }));

      // Combine specification values with units
      const specifications = {
        range_km: formData.specifications.range_value
          ? `${formData.specifications.range_value} ${rangeUnit}`
          : "",
        battery_type: formData.specifications.battery_type || "Lithium-ion",
        battery_capacity:
          formData.specifications.battery_voltage &&
          formData.specifications.battery_capacity
            ? `${formData.specifications.battery_voltage}${batteryVoltageUnit} ${formData.specifications.battery_capacity}${batteryCapacityUnit}`
            : formData.specifications.battery_voltage
              ? `${formData.specifications.battery_voltage}${batteryVoltageUnit}`
              : "",
        top_speed: formData.specifications.top_speed_value
          ? `${formData.specifications.top_speed_value} ${speedUnit}`
          : "",
        charging_time: formData.specifications.charging_time_value
          ? `${formData.specifications.charging_time_value} ${chargingUnit}`
          : "",
        motor_power: formData.specifications.motor_power_value
          ? `${formData.specifications.motor_power_value} ${motorPowerUnit}`
          : "",
        weight: formData.specifications.weight_value
          ? `${formData.specifications.weight_value} ${weightUnit}`
          : "",
        load_capacity: formData.specifications.load_capacity_value
          ? `${formData.specifications.load_capacity_value} ${loadUnit}`
          : "",
        colors: formData.specifications.colors
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      };

      // Prepare final data
      const productData = {
        ...formData,
        base_price: parseFloat(formData.base_price),
        dealer_price: parseFloat(formData.dealer_price),
        mrp: parseFloat(formData.mrp),
        tax_rate: parseFloat(formData.tax_rate),
        total_stock: parseInt(formData.total_stock),
        low_stock_threshold: parseInt(formData.low_stock_threshold),
        specifications,
        images: processedImages,
        videos: videoPreview ? [videoPreview] : [],
        warranty: {
          free_services: parseInt(formData.warranty.free_services),
          warranty_period_months: parseInt(
            formData.warranty.warranty_period_months,
          ),
          terms: formData.warranty.terms,
        },
        service_charges: {
          standard_service: parseFloat(
            formData.service_charges.standard_service,
          ),
          major_service: parseFloat(formData.service_charges.major_service),
          repair: parseFloat(formData.service_charges.repair),
          inspection: parseFloat(formData.service_charges.inspection),
        },
        meta_title: formData.meta_title || `${formData.name} - E-Bike Point`,
        meta_description:
          formData.meta_description ||
          `Buy ${formData.name} at best price. ${formData.description?.substring(0, 100)}`,
      };

      console.log("📤 Submitting product data:", productData);

      // Submit to API
      let response;
      if (isEditMode) {
        response = await updateProduct(product.id, productData);
      } else {
        response = await createProduct(productData);
      }

      console.log("✅ API Response:", response);

      onSuccess?.();
    } catch (error) {
      console.error("❌ Error saving product:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save product. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto space-y-6 max-w-7xl"
    >
      {/* Media Upload Section */}
      <Card className="overflow-hidden border-2 border-dashed shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-gradient-to-br from-[#1e4488] to-[#00AFAA] rounded-xl shadow-md">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Product Media <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Upload high-quality images (min 3) and video (required)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            {/* Left Section: Multiple Images */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4 py-3 border border-blue-200 shadow-sm bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500 rounded-lg">
                    <ImageIcon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-blue-900">
                    {images.length} image(s) uploaded (Min: 3)
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                  Required
                </span>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <ImagePreviewBox
                    key={index}
                    image={image}
                    index={index}
                    isPrimary={index === primaryImageIndex}
                    onRemove={() => removeImage(index)}
                    onSetPrimary={() => setPrimaryImage(index)}
                  />
                ))}

                {/* Add More Images Button */}
                <label className="relative h-40 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 via-white to-blue-50 hover:from-blue-50 hover:via-cyan-50 hover:to-blue-100 hover:border-[#1e4488] transition-all duration-300 group shadow-sm hover:shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="p-3 bg-gradient-to-br from-[#1e4488] to-[#00AFAA] rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg inline-block">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-bold text-gray-700 group-hover:text-[#1e4488]">
                      Add More
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {images.length < 3 && (
                <div className="flex items-center gap-2 p-3 border border-red-200 rounded-lg bg-red-50">
                  <span className="text-sm font-medium text-red-600">
                    ⚠️ Please upload at least 3 images
                  </span>
                </div>
              )}
            </div>

            {/* Right Section: Video (Required) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4 py-3 border border-red-200 shadow-sm bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-500 rounded-lg">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-red-900">
                    Product video (Required)
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">
                  REQUIRED
                </span>
              </div>

              <MediaUploadBox
                label="Product Demo Video"
                preview={videoPreview}
                onUpload={handleVideoUpload}
                onRemove={() => setVideoPreview("")}
                accept="video/*"
                isVideo
                required
                large
              />

              {!videoPreview && (
                <div className="flex items-center gap-2 p-3 border border-red-200 rounded-lg bg-red-50">
                  <span className="text-sm font-medium text-red-600">
                    ⚠️ Product video is required
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="shadow-sm">
        <CardContent className="p-8">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              label="Product Name"
              id="name"
              required
              error={errors.name?.message}
            >
              <Input
                id="name"
                {...register("name", { required: "Product name is required" })}
                placeholder="e.g., Super Bike LIGHTNING"
                className={errors.name ? "border-red-500" : ""}
              />
            </FormField>

            <FormField
              label="Model Number"
              id="model"
              required
              error={errors.model?.message}
            >
              <Input
                id="model"
                {...register("model", { required: "Model is required" })}
                placeholder="e.g., LIGHTNING-2024"
                className={errors.model ? "border-red-500" : ""}
              />
            </FormField>

            <FormField
              label="URL Slug"
              id="slug"
              helperText="Auto-generated from product name"
            >
              <Input
                id="slug"
                {...register("slug", { required: "Slug is required" })}
                placeholder="super-bike-lightning"
                readOnly={!isEditMode}
                className="bg-gray-50"
              />
            </FormField>

            <FormField label="Category" id="category" required>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className="flex w-full h-11 px-3 py-2 text-sm border rounded-lg border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e4488] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="electric-scooter">Electric Scooter</option>
                <option value="electric-bike">Electric Bike</option>
                <option value="electric-motorcycle">Electric Motorcycle</option>
                <option value="cargo-bike">Cargo Bike</option>
              </select>
            </FormField>
          </div>

          <FormField
            label="Product Description"
            id="description"
            className="mt-6"
          >
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              className="flex w-full px-3 py-2 text-sm border rounded-lg border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e4488] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="Provide a detailed description of the product features, benefits, and specifications..."
            />
          </FormField>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="shadow-sm">
        <CardContent className="p-8">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Pricing Information
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FormField label="Base Price" id="base_price" required>
              <div className="relative">
                <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                  ₹
                </span>
                <Input
                  id="base_price"
                  type="number"
                  step="0.01"
                  {...register("base_price", { required: "Required" })}
                  placeholder="45,000"
                  className="pl-7"
                />
              </div>
            </FormField>

            <FormField label="Dealer Price" id="dealer_price" required>
              <div className="relative">
                <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                  ₹
                </span>
                <Input
                  id="dealer_price"
                  type="number"
                  step="0.01"
                  {...register("dealer_price", { required: "Required" })}
                  placeholder="40,000"
                  className="pl-7"
                />
              </div>
            </FormField>

            <FormField label="MRP" id="mrp" required>
              <div className="relative">
                <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                  ₹
                </span>
                <Input
                  id="mrp"
                  type="number"
                  step="0.01"
                  {...register("mrp", { required: "Required" })}
                  placeholder="50,000"
                  className="pl-7"
                />
              </div>
            </FormField>

            <FormField label="Tax Rate" id="tax_rate">
              <div className="relative">
                <Input
                  id="tax_rate"
                  type="number"
                  step="0.01"
                  {...register("tax_rate")}
                  placeholder="18"
                  className="pr-7"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2">
                  %
                </span>
              </div>
            </FormField>
          </div>
        </CardContent>
      </Card>

      {/* Specifications with Units */}
      <Card className="shadow-sm">
        <CardContent className="p-8">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Technical Specifications
          </h3>

          <div className="space-y-6">
            {/* Range */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField label="Range" id="range_value">
                  <Input
                    id="range_value"
                    {...register("specifications.range_value")}
                    placeholder="50-60"
                    type="number"
                    step="0.1"
                  />
                </FormField>
              </div>
              <FormField label="Unit" id="range_unit">
                <select
                  value={rangeUnit}
                  onChange={(e) => setRangeUnit(e.target.value)}
                  className="flex w-full px-3 py-2 text-sm border rounded-lg h-11 border-input bg-background"
                >
                  <option value="km">Kilometers (km)</option>
                  <option value="miles">Miles</option>
                </select>
              </FormField>
            </div>

            {/* Top Speed */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField label="Top Speed" id="top_speed_value">
                  <Input
                    id="top_speed_value"
                    {...register("specifications.top_speed_value")}
                    placeholder="50"
                    type="number"
                    step="0.1"
                  />
                </FormField>
              </div>
              <FormField label="Unit" id="speed_unit">
                <select
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value)}
                  className="flex w-full px-3 py-2 text-sm border rounded-lg h-11 border-input bg-background"
                >
                  <option value="km/h">km/h</option>
                  <option value="mph">mph</option>
                </select>
              </FormField>
            </div>

            {/* Battery */}
            <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                Battery Specifications
              </h4>

              <div className="space-y-4">
                <FormField label="Battery Type" id="battery_type">
                  <select
                    {...register("specifications.battery_type")}
                    className="flex w-full px-3 py-2 text-sm bg-white border rounded-lg h-11 border-input"
                  >
                    <option value="Lithium-ion">Lithium-ion</option>
                    <option value="Lithium Polymer">Lithium Polymer</option>
                    <option value="Lead Acid">Lead Acid</option>
                    <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
                    <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                  </select>
                </FormField>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <FormField label="Voltage" id="battery_voltage">
                        <Input
                          id="battery_voltage"
                          {...register("specifications.battery_voltage")}
                          placeholder="48"
                          type="number"
                          step="0.1"
                        />
                      </FormField>
                    </div>
                    <FormField label="Unit" id="voltage_unit">
                      <select
                        value={batteryVoltageUnit}
                        onChange={(e) => setBatteryVoltageUnit(e.target.value)}
                        className="flex w-full px-3 py-2 text-sm bg-white border rounded-lg h-11 border-input"
                      >
                        <option value="V">V</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <FormField label="Capacity" id="battery_capacity">
                        <Input
                          id="battery_capacity"
                          {...register("specifications.battery_capacity")}
                          placeholder="24"
                          type="number"
                          step="0.1"
                        />
                      </FormField>
                    </div>
                    <FormField label="Unit" id="capacity_unit">
                      <select
                        value={batteryCapacityUnit}
                        onChange={(e) => setBatteryCapacityUnit(e.target.value)}
                        className="flex w-full px-3 py-2 text-sm bg-white border rounded-lg h-11 border-input"
                      >
                        <option value="Ah">Ah</option>
                        <option value="mAh">mAh</option>
                      </select>
                    </FormField>
                  </div>
                </div>
              </div>
            </div>

            {/* Charging Time */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField label="Charging Time" id="charging_time_value">
                  <Input
                    id="charging_time_value"
                    {...register("specifications.charging_time_value")}
                    placeholder="4-5"
                    type="number"
                    step="0.1"
                  />
                </FormField>
              </div>
              <FormField label="Unit" id="charging_unit">
                <select
                  value={chargingUnit}
                  onChange={(e) => setChargingUnit(e.target.value)}
                  className="flex w-full px-3 py-2 text-sm border rounded-lg h-11 border-input bg-background"
                >
                  <option value="hours">Hours</option>
                  <option value="minutes">Minutes</option>
                </select>
              </FormField>
            </div>

            {/* Motor Power */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField label="Motor Power" id="motor_power_value">
                  <Input
                    id="motor_power_value"
                    {...register("specifications.motor_power_value")}
                    placeholder="1000"
                    type="number"
                    step="0.1"
                  />
                </FormField>
              </div>
              <FormField label="Unit" id="motor_unit">
                <select
                  value={motorPowerUnit}
                  onChange={(e) => setMotorPowerUnit(e.target.value)}
                  className="flex w-full px-3 py-2 text-sm border rounded-lg h-11 border-input bg-background"
                >
                  <option value="W">Watts (W)</option>
                  <option value="kW">Kilowatts (kW)</option>
                </select>
              </FormField>
            </div>

            {/* Weight */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField label="Weight" id="weight_value">
                  <Input
                    id="weight_value"
                    {...register("specifications.weight_value")}
                    placeholder="80"
                    type="number"
                    step="0.1"
                  />
                </FormField>
              </div>
              <FormField label="Unit" id="weight_unit">
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="flex w-full px-3 py-2 text-sm border rounded-lg h-11 border-input bg-background"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lbs">Pounds (lbs)</option>
                </select>
              </FormField>
            </div>

            {/* Load Capacity */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField label="Load Capacity" id="load_capacity_value">
                  <Input
                    id="load_capacity_value"
                    {...register("specifications.load_capacity_value")}
                    placeholder="150"
                    type="number"
                    step="0.1"
                  />
                </FormField>
              </div>
              <FormField label="Unit" id="load_unit">
                <select
                  value={loadUnit}
                  onChange={(e) => setLoadUnit(e.target.value)}
                  className="flex w-full px-3 py-2 text-sm border rounded-lg h-11 border-input bg-background"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lbs">Pounds (lbs)</option>
                </select>
              </FormField>
            </div>

            {/* Colors */}
            <FormField
              label="Available Colors"
              id="colors"
              helperText="Comma-separated (e.g., Black, Red, Blue)"
            >
              <Input
                id="colors"
                {...register("specifications.colors")}
                placeholder="Black, Red, Blue, White"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      {/* Stock & Availability */}
      <Card className="shadow-sm">
        <CardContent className="p-8">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Stock & Availability
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FormField label="Total Stock" id="total_stock" required>
              <Input
                id="total_stock"
                type="number"
                {...register("total_stock", { required: "Required" })}
                placeholder="100"
              />
            </FormField>

            <FormField label="Low Stock Alert" id="low_stock_threshold">
              <Input
                id="low_stock_threshold"
                type="number"
                {...register("low_stock_threshold")}
                placeholder="10"
              />
            </FormField>

            <div className="flex flex-col justify-end gap-4 pb-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("is_available")}
                  className="w-5 h-5 rounded border-gray-300 text-[#1e4488] focus:ring-[#1e4488]"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Available for Sale
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("is_featured")}
                  className="w-5 h-5 rounded border-gray-300 text-[#1e4488] focus:ring-[#1e4488]"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Featured Product
                </span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warranty & Service */}
      <Card className="shadow-sm">
        <CardContent className="p-8">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Warranty & Service Charges
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField label="Free Services Count" id="free_services">
                <Input
                  id="free_services"
                  type="number"
                  {...register("warranty.free_services")}
                  placeholder="4"
                />
              </FormField>

              <FormField
                label="Warranty Period (Months)"
                id="warranty_period_months"
              >
                <Input
                  id="warranty_period_months"
                  type="number"
                  {...register("warranty.warranty_period_months")}
                  placeholder="24"
                />
              </FormField>
            </div>

            <FormField label="Warranty Terms" id="warranty_terms">
              <Input
                id="warranty_terms"
                {...register("warranty.terms")}
                placeholder="2 years warranty with 4 free services"
              />
            </FormField>

            <div className="pt-4 border-t">
              <h4 className="mb-4 text-sm font-semibold text-gray-700">
                Service Charges
              </h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FormField label="Standard Service" id="standard_service">
                  <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                      ₹
                    </span>
                    <Input
                      id="standard_service"
                      type="number"
                      step="0.01"
                      {...register("service_charges.standard_service")}
                      placeholder="500"
                      className="pl-7"
                    />
                  </div>
                </FormField>

                <FormField label="Major Service" id="major_service">
                  <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                      ₹
                    </span>
                    <Input
                      id="major_service"
                      type="number"
                      step="0.01"
                      {...register("service_charges.major_service")}
                      placeholder="1000"
                      className="pl-7"
                    />
                  </div>
                </FormField>

                <FormField label="Repair Charges" id="repair">
                  <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                      ₹
                    </span>
                    <Input
                      id="repair"
                      type="number"
                      step="0.01"
                      {...register("service_charges.repair")}
                      placeholder="500"
                      className="pl-7"
                    />
                  </div>
                </FormField>

                <FormField label="Inspection Fee" id="inspection">
                  <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                      ₹
                    </span>
                    <Input
                      id="inspection"
                      type="number"
                      step="0.01"
                      {...register("service_charges.inspection")}
                      placeholder="300"
                      className="pl-7"
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex items-center justify-between gap-4 p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50">
        <p className="text-sm text-gray-600">
          <span className="text-red-500">*</span> Required fields
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="min-w-[100px] border-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#1e4488] to-[#00AFAA] hover:from-[#1a3a70] hover:to-[#008f8a] min-w-[140px] shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>{isEditMode ? "Update Product" : "Create Product"}</>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

// Image Preview Component
const ImagePreviewBox = ({
  image,
  index,
  isPrimary,
  onRemove,
  onSetPrimary,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative h-40 group"
    >
      <div className="relative w-full h-full overflow-hidden border-2 border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <img
          src={image.url}
          alt={`Product ${index + 1}`}
          className="object-cover w-full h-full rounded-2xl"
        />

        {/* Primary Badge */}
        {isPrimary && (
          <div className="absolute flex items-center gap-1 px-2 py-1 text-xs font-bold text-yellow-900 border-2 border-yellow-500 rounded-full shadow-sm top-2 left-2 bg-gradient-to-r from-yellow-400 to-amber-400">
            <span>⭐</span> Primary
          </div>
        )}

        {/* Hover Controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
          {!isPrimary && (
            <Button
              type="button"
              size="sm"
              onClick={onSetPrimary}
              className="text-xs bg-yellow-500 hover:bg-yellow-600"
            >
              Set Primary
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={onRemove}
            className="text-xs"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Form Field Component
const FormField = ({
  label,
  id,
  required = false,
  error,
  helperText,
  className = "",
  children,
}) => {
  return (
    <div className={className}>
      <Label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
        {helperText && (
          <span className="ml-2 text-xs font-normal text-gray-500">
            ({helperText})
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

// Media Upload Box Component
const MediaUploadBox = ({
  label,
  preview,
  onUpload,
  onRemove,
  accept,
  required = false,
  isVideo = false,
  large = false,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      </div>

      <div className={`${large ? "h-[450px]" : "h-52"} relative`}>
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full overflow-hidden border-2 border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group"
            >
              <video
                src={preview}
                controls
                className="object-contain w-full h-full bg-black rounded-2xl"
              />

              <button
                type="button"
                onClick={onRemove}
                className="absolute p-2.5 text-white transition-all bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-xl opacity-0 top-4 right-4 hover:from-red-600 hover:to-red-700 group-hover:opacity-100 hover:scale-110 transform"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:opacity-100 rounded-b-2xl">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Video className="w-4 h-4" /> Video uploaded successfully
                </p>
                <p className="mt-1 text-xs text-gray-300">
                  Hover and click the red button to remove
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.label
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center w-full h-full border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 via-white to-blue-50 hover:from-blue-50 hover:via-cyan-50 hover:to-blue-100 hover:border-[#1e4488] transition-all duration-300 group shadow-sm hover:shadow-xl"
            >
              <div className="flex flex-col items-center justify-center px-6 py-8">
                <div className="p-4 bg-gradient-to-br from-[#1e4488] to-[#00AFAA] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <p className="mb-2 text-base font-bold text-gray-700 group-hover:text-[#1e4488] transition-colors">
                  Click to upload or drag and drop
                </p>
                <p className="mb-1 text-sm text-gray-500">MP4, WebM, OGG</p>
                <p className="text-xs text-gray-400 mt-2 px-4 py-1.5 bg-gray-100 rounded-full">
                  Max size: 50MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={accept}
                onChange={onUpload}
              />
            </motion.label>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductForm;
