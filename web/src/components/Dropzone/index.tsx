import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

interface Props {
  onFileUploader: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploader }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);

    onFileUploader(file);
  }, [onFileUploader])

  const {getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*'
    })

  return (
    <div {...getRootProps()}>
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