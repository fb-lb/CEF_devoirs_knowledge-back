[**knowledge-back v0.0.0**](../../../README.md)

***

[knowledge-back](../../../modules.md) / [types/types](../README.md) / NewLog

# Type Alias: NewLog

> **NewLog** = `BaseLog` & \{ `event`: `LogEvent` & `"LOGIN_SUCCESS"`; `level`: `LogLevel` & `"info"`; `metadata`: \{ `ip`: `string`; \}; `type`: `LogType` & `"auth"`; `userId`: `number`; \} \| \{ `event`: `LogEvent` & `"LOGIN_FAILED"`; `level`: `LogLevel` & `"warn"`; `metadata`: \{ `email`: `string`; `ip`: `string`; \}; `type`: `LogType` & `"auth"`; \} \| \{ `event`: `LogEvent` & `"DATABASE_ERROR"`; `level`: `LogLevel` & `"error"`; `metadata`: \{ `errorCode`: `string`; `model`: [`ModelList`](ModelList.md); `operation`: `string`; \}; `type`: `LogType` & `"error"`; \} \| \{ `event`: `LogEvent` & `"USER_ROLE_CHANGED"`; `level`: `LogLevel` & `"info"`; `metadata`: \{ `newRole`: `RoleList`; `oldRole`: `RoleList`; `targetUserId`: `number`; \}; `type`: `LogType` & `"audit"`; `userId`: `number`; \}

Defined in: [src/types/types.ts:34](https://github.com/fb-lb/CEF_devoirs_knowledge-back/blob/a2ea6a85c9a696b582add7a1af0a3500ca474c01/src/types/types.ts#L34)
