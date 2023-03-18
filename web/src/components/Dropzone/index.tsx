import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';
import './styles.css'

interface Props {
  onFileUploader: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploader }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploader(file);
  }, [onFileUploader])

  const {getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
        'image/jpeg': ['.jpeg'],
        'image/webp': ['.webp'],
      }
    })

  return (
    <div {...getRootProps({ className: 'content-file' })}>
      <input {...getInputProps()} accept="image/*"/>
      { selectedFileUrl
          ? <img src={selectedFileUrl} alt="Point thumbnail" />
          : (
              <p>
                  <FiUpload />
                  Imagem do estabelecimento
              </p>
          )
      }
    </div>
  )
}

export default Dropzone;