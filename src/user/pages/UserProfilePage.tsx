import { useEffect, useMemo, useRef, useState } from 'react'
import isEqual from 'lodash.isequal'

import { UserAvatar } from '../../components/user-avatar/UserAvatar'
import { useUserActions } from '../../store/hooks/useUserActions'

import { IUpdateUserDto } from '../../types/dtos/user'
import { IUserForm, IUser } from '../../types/user'

import { Input } from '../../components/input/Input'
import { Button } from '../../components/button/Button'
import { ButtonLink } from '../../components/button-link/ButtonLink'
import { MultiSelectInput } from '../../components/multi-select-input/MultiSelectInput'

import { LoaderPage } from '../../components/loader-page/LoaderPage'

import { useForm } from '../../hooks/useForm'

import { useInvitationActions } from '../../store/hooks/useInvitationActions'

import {
  userFormFields,
  userFormValidations,
} from '../../helpers/form-validations/getUserFormValidations'

import './UserProfilePage.css'

/**
 * User profile page component for editing user information and avatar
 * Features: profile data editing, avatar upload, form validation, error handling
 * @returns JSX.Element - User profile form with avatar upload
 */
const UserProfilePage = () => {
  const originalFormRef = useRef<IUserForm | null>(null)
  // Custom hook for user operations
  const {
    user,
    fetchingProfile,
    updatingProfile,
    uploadingAvatar,
    updateProfile,
    uploadAvatar,
    fetchUserError,
    updateUserError,
    uploadUserAvatarError,
  } = useUserActions()

  const { inviteContact, inviting, inviteContactError } = useInvitationActions()

  const {
    formState: { firstName, lastName, email, profileImageURL },
    firstNameValid,
    lastNameValid,
    touchedFields,
    isFormValid,
    formState,
    setFormState,
    onInputChange,
    onBlurField,
  } = useForm<IUserForm>(userFormFields, userFormValidations)

  // Local state for file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  const formHasChanges = useMemo(() => {
    if (!originalFormRef.current) return false

    const hasFormChanges = !isEqual(formState, originalFormRef.current)

    return hasFormChanges || selectedFile !== null
  }, [formState, selectedFile])

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

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
      setPreview(profileImageURL)

      originalFormRef.current = {
        email,
        firstName,
        lastName,
        profileImageURL,
        contacts,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /**
   * Handle file selection for avatar upload
   * @param file - Selected file from UserAvatar component
   */
  const handleFileChange = (file: File) => {
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const sendEmailInvitation = (email: string) => {
    inviteContact({ email })
  }

  /**
   * Handle form submission with avatar upload and profile update
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formHasChanges && !selectedFile) return
    if (formHasChanges && !isFormValid) return

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

  if (fetchingProfile || !user) return <LoaderPage />

  // Allow submit if form is valid OR only changing avatar
  const isSubmitDisabled =
    (!formHasChanges && !selectedFile) ||
    (formHasChanges && !isFormValid) ||
    updatingProfile ||
    uploadingAvatar

  const displayError =
    fetchUserError?.message || updateUserError?.message || uploadUserAvatarError?.message

  return (
    <section className="user-profile-page section container">
      <form className="user-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <p className="user-profile-form__backend-error" role="alert">
          {displayError}
        </p>
        <header className="user-profile-form__header">
          <h1 className="user-profile-form__header-title">Profile: {firstName}</h1>

          <UserAvatar
            imageUrl={preview || user.profileImageURL}
            firstName={firstName}
            lastName={lastName}
            size="lg"
            editable
            loading={uploadingAvatar}
            onFileChange={handleFileChange}
            ariaLabel="Upload profile picture"
          />
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

        <MultiSelectInput<IUser>
          label="Contacts"
          typeOption="email"
          options={user.contacts}
          actionOnEmpty
          actionLabel="Invite"
          actionMethod={sendEmailInvitation}
          loading={inviting}
          error={inviteContactError?.fieldsValidations?.email || inviteContactError?.message}
          getOptionLabel={(user: IUser) => user.email}
          getOptionKey={(user: IUser) => user.id}
        />

        <footer className="user-profile-form__footer">
          <Button
            className="user-profile-form__btn"
            type="submit"
            variant="filled"
            disabled={isSubmitDisabled}
          >
            {updatingProfile || uploadingAvatar ? 'Saving…' : 'Save changes'}
          </Button>

          <ButtonLink variant="outlined" className="user-profile-form__btn" to="/home">
            Go home
          </ButtonLink>
        </footer>
      </form>
    </section>
  )
}

export default UserProfilePage
