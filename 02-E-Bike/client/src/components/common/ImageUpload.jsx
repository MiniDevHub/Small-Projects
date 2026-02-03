import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageUpload = ({ images = [], onChange, maxImages = 10, disabled = false }) => {
  const [previews, setPreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return `${file.name} is not an image`;
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return `${file.name} exceeds 5MB`;
    }

    return null;
  };

  const handleFiles = (files) => {
    setError('');
    const fileArray = Array.from(files);

    if (fileArray.length + images.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    const validFiles = [];
    const errors = [];

    fileArray.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(validationError);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }

    // Create previews
    const newPreviews = [];
    let loadedCount = 0;

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          file,
          preview: e.target.result,
          name: file.name,
        });
        loadedCount++;

        if (loadedCount === validFiles.length) {
          setPreviews([...previews, ...newPreviews]);
          onChange([...images, ...validFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newImages = images.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange(newImages);
  };

  const moveImage = (fromIndex, toIndex) => {
    const newPreviews = [...previews];
    const newImages = [...images];

    [newPreviews[fromIndex], newPreviews[toIndex]] = [newPreviews[toIndex], newPreviews[fromIndex]];
    [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]];

    setPreviews(newPreviews);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-[#1e4488] bg-blue-50'
            : 'border-gray-300 hover:border-[#1e4488] hover:bg-gray-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="mb-2 font-medium text-gray-700">
          {dragActive ? 'Drop images here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-sm text-gray-500">
          PNG, JPG, WEBP up to 5MB (Max {maxImages} images)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-red-600 border border-red-200 rounded-lg bg-red-50">
          <AlertCircle className="flex-shrink-0 w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Image Previews */}
      {previews.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">
            {previews.length} image{previews.length !== 1 ? 's' : ''} selected
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="relative overflow-hidden border-2 border-gray-200 rounded-lg aspect-square bg-gray-50">
                  <img
                    src={preview.preview}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />

                  {/* Primary Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-[#1e4488] text-white text-xs px-2 py-1 rounded font-semibold">
                      Primary
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
                    {/* Move Left */}
                    {index > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(index, index - 1);
                        }}
                        className="flex items-center justify-center w-8 h-8 transition-transform bg-white rounded-full hover:scale-110"
                        title="Move left"
                      >
                        ←
                      </button>
                    )}

                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="flex items-center justify-center w-8 h-8 text-white transition-transform bg-red-500 rounded-full hover:scale-110"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Move Right */}
                    {index < previews.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(index, index + 1);
                        }}
                        className="flex items-center justify-center w-8 h-8 transition-transform bg-white rounded-full hover:scale-110"
                        title="Move right"
                      >
                        →
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-1 text-xs text-gray-500 truncate" title={preview.name}>
                  {preview.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
