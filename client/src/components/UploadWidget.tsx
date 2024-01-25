import React from 'react';
import { useEffect, useRef } from 'react';
import {Button} from "@/components/ui/button.tsx";
const UploadWidget: React.FC = ({ onImageUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'sanket12',
            upload_preset: 'plcy9ur1',
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                onImageUpload(result.info.secure_url);
            } else {
                console.error("Upload error:", error);
            }
        });

    }, [onImageUpload]);
    return (
        <>
            <Button
                onClick={() => widgetRef.current.open()}
                className="bg-white border text-gray-500 hover:bg-white"
            >
                Upload Image
            </Button>
        </>
    );
};

export default UploadWidget;