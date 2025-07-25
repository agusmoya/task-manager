import { useEffect, useState } from 'react'

import { useUserActions } from '../../store/hooks/useUserActions'

import { IUpdateUserDto } from '../../types/dtos/user'
import { IUserForm } from '../../types/user'

import { Loader } from '../../components/loader-page/Loader'
import { Input } from '../../components/input/Input'
import { Button } from '../../components/button/Button'
import { ButtonLink } from '../../components/button-link/ButtonLink'

import { useForm } from '../../hooks/useForm'

import {
  userFormFields,
  userFormValidations,
} from '../../helpers/form-validations/getUserFormValidations'
import { getEnvVariables } from '../../helpers/getEnvVariables'
import { buildImageUrl } from '../../helpers/buildImageUrl'

import './UserProfilePage.css'

const MAX_FILE_SIZE = 1024 * 1024 // 1MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg']

/**
 * User profile page component for editing user information and avatar
 * Features: profile data editing, avatar upload, form validation, error handling
 * @returns JSX.Element - User profile form with avatar upload
 */
const UserProfilePage = () => {
  const { VITE_API_URL } = getEnvVariables()

  // Custom hook for user operations
  const {
    user,
    fetchingProfile: isLoading,
    updatingProfile: updating,
    uploadingAvatar,
    updateProfile,
    uploadAvatar,
    fetchUserError,
    updateUserError,
    uploadUserAvatarError,
  } = useUserActions()

  // Local state for file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(user?.profileImageURL || '')
  const [fileError, setFileError] = useState<string>('')

  const {
    formState: { firstName, lastName, email, profileImageURL },
    firstNameValid,
    lastNameValid,
    touchedFields,
    setFormState,
    onInputChange,
    onBlurField,
  } = useForm<IUserForm>(userFormFields, userFormValidations)

  useEffect(() => {
    if (user) {
      const { email, firstName, lastName, profileImageURL, contacts = [] } = user
      setFormState({
        email,
        firstName,
        lastName,
        profileImageURL,
        contacts,
      })
      setPreview(user.profileImageURL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /**
   * Handle file selection and validation for avatar upload
   * @param e - File input change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Only PNG or JPEG allowed')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError('The file must be less than 1 MB.')
      return
    }

    // Clear errors and set file
    setFileError('')
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  /**
   * Handle form submission with avatar upload and profile update
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let avatarUrl = profileImageURL

    // Upload avatar if file is selected
    if (selectedFile) {
      const formData = new FormData()
      formData.append('avatar', selectedFile)
      const uploadResult = await uploadAvatar(formData)

      if (uploadResult.data?.profileImageURL) {
        avatarUrl = uploadResult.data.profileImageURL
        // Update preview immediately with server URL
        setPreview(avatarUrl)
      }
    }

    // Update profile with new data
    const userPayload: IUpdateUserDto = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      profileImageURL: avatarUrl,
    }

    await updateProfile(userPayload)

    // Clear selected file after successful update
    setSelectedFile(null)
  }

  if (isLoading) return <Loader />

  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()

  // Get the most relevant error to display
  const displayError =
    fetchUserError?.message ||
    updateUserError?.message ||
    uploadUserAvatarError?.message ||
    fileError

  return (
    <section className="user-profile-page section container">
      <form className="user-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <p className="user-profile-form__backend-error" role="alert">
          {displayError}
        </p>
        <header className="user-profile-form__header">
          <h1 className="user-profile-form__header-title">Profile: {user?.firstName}</h1>

          <label className="avatar-picker">
            {preview ? (
              <img
                src={buildImageUrl(preview, VITE_API_URL)}
                alt={`${firstName} ${lastName} avatar`}
                className="avatar-picker__img"
              />
            ) : (
              <div className="avatar-picker__placeholder">{initials}</div>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="avatar-picker__input"
              onChange={handleFileChange}
              aria-label="Upload profile picture"
            />
          </label>
        </header>

        <Input label="Email" name="email" value={email} required disabled />
        <Input
          label="First Name"
          name="firstName"
          value={firstName}
          required
          onChange={onInputChange}
          onBlur={() => onBlurField('firstName')}
          touched={touchedFields.firstName}
          error={firstNameValid}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={onInputChange}
          required
          onBlur={() => onBlurField('lastName')}
          touched={touchedFields.lastName}
          error={lastNameValid}
        />

        <footer className="user-profile-form__footer">
          <Button
            className="user-profile-form__btn"
            type="submit"
            variant="filled"
            disabled={updating || uploadingAvatar}
          >
            {updating || uploadingAvatar ? 'Saving…' : 'Save Changes'}
          </Button>

          <ButtonLink variant="outlined" className="user-profile-form__btn" to="/home">
            Go Home
          </ButtonLink>
        </footer>
      </form>
    </section>
  )
}

export default UserProfilePage
