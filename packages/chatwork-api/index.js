// @flow
import axios from 'axios'
import { stringify as qs } from 'qs'

const buildBody = (body: ?Object) => body ? { body: qs(body) } : {}
const buildAuthHeader = (token: string): { 'X-ChatWorkToken': string } => ({ 'X-ChatWorkToken': token })

type Request = {
  room_id: number,
  body: string,
}
type Token = {
  token: string
}
type MessageID = string
type Response = {
  message_id: MessageID,
}
/*
 import { postRoomMessage } from './index'
 postRoomMessage({
  room_id: 84100351,
  body: 'test',
  token: CHATWORK_ACCESS_TOKEN
})
*/
export const postRoomMessage = ({room_id, body, token}: Request & Token): Promise<{data: Response, headers?: {[string]: string}}> =>
  axios({
    method: 'post',
    url: `/rooms/${room_id}/messages`,
    baseURL: 'https://api.chatwork.com/v2',
    data: { ...buildBody({ body }) }.body,
    headers: buildAuthHeader(token),
  })
