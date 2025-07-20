// ---------- COMPONENT DESCRIPTION ---------- //

// This is a File Input component
// It is used to create a file input field with optional label, placeholder, and error
// It can be used in forms or anywhere a file input is needed
// value and onChange props are required
// label, placeholder, disabled, required, error are optional props
// It can be used to upload files, such as images or documents

// ---------- EXAMPLE USAGE ---------- //
{
  /* <FileInputComponent
  label="Upload File"
  onChange={(value: any) => {
    setSearch(value);
    console.log('File uploaded:', value);
  }}
  error="This field is required."
  required
  value={search}
  // disabled
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import FileInput from '@/components/form/input/FileInput';
import Label from '@/components/form/Label';
import React from 'react';
import { DeleteIcon } from '../../../../public/icons/svg-icons';

// ------------- props interface
interface componentProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange:  Function;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const FileInputComponent: React.FC<componentProps> = ({
  label,
  value,
  onChange,
  disabled,
  required,
  error,
}) => {
  // const [loading, setLoading] = React.useState(false);

  // Function to handle file upload
  //   now returning a dummy data
  const handleFileUploadTenderDocument = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (loading) {
    //   return;
    // }
    // try {
    //   setLoading(true);
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     // const data = await upload_file(formData);
    //     if (data.success) {
    //       onChange(data.data.filePath);
    //     } else {
    //       setAlert({
    //         open: true,
    //         message: 'Error',
    //         description: data.message,
    //         variant: 'destructive',
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
    onChange(event); // Dummy data for now
  };
  return (
    <div>
      {label && (
        <Label>
          {label}
          {required ? <span className="text-error-500 ml-1">*</span> : ''}
        </Label>
      )}
      {value ? (
        <div className="flex w-1/4 gap-1">
          <span
            onClick={() => {
              //   window.open(config.clientUrl + form.profilePicture, '_blank');
            }}
          >
            <Label className="text-blue-light-700 underline cursor-pointer">
              Document
            </Label>
          </span>
          <DeleteIcon
            className="text-error-600 cursor-pointer"
            width={24.7}
            height={24.7}
            onClick={() => {
              onChange('');
            }}
          />
        </div>
      ) : (
        <>
          <FileInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleFileUploadTenderDocument(event);
            }}
            className={`${disabled ? 'cursor-not-allowed opacity-50' : ''} `}
            disabled={disabled}
          />
          {error && <p className="mt-1 text-xs text-error-500">{error}</p>}{' '}
        </>
      )}
    </div>
  );
};

export default FileInputComponent;
