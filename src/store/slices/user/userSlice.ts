import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../../types/user'

interface UserState {
  users: IUser[]
}

const initialState: UserState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})
