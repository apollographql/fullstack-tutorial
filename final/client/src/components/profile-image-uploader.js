import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const UPLOAD_PROFILE_IMAGE = gql`
  mutation UploadProfileImage($file: Upload!) {
    uploadProfileImage(file: $file) {
      id
      profileImage
    }
  }
`;

export default function ProfileImageUploader() {
  const [uploadProfileImage, {loading, error}] = useMutation(UPLOAD_PROFILE_IMAGE);

  function handleSubmit(event) {
    event.preventDefault();

    const [file] = event.target.file.files;
    uploadProfileImage({
      variables: {
        file
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <input required type="file" name="file" />
      <button type="submit" disabled={loading}>Submit</button>
    </form>
  )
}
