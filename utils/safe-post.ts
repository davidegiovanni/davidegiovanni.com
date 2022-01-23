import { AxiosInstance, AxiosResponse } from 'axios'

export enum Code {
  // Not an error; returned on success
//
// HTTP Mapping: 200 OK
Ok = 0,

// The operation was cancelled, typically by the caller.
//
// HTTP Mapping: 499 Client Closed Request
Cancelled = 1,

// Unknown error.  For example, this error may be returned when
// a `Status` value received from another address space belongs to
// an error space that is not known in this address space.  Also
// errors raised by APIs that do not return enough error information
// may be converted to this error.
//
// HTTP Mapping: 500 Internal Server Error
Unknown = 2,

// The client specified an invalid argument.  Note that this differs
// from `FAILED_PRECONDITION`.  `INVALID_ARGUMENT` indicates arguments
// that are problematic regardless of the state of the system
// (e.g., a malformed file name).
//
// HTTP Mapping: 400 Bad Request
InvalidArgument = 3,

// The deadline expired before the operation could complete. For operations
// that change the state of the system, this error may be returned
// even if the operation has completed successfully.  For example, a
// successful response from a server could have been delayed long
// enough for the deadline to expire.
//
// HTTP Mapping: 504 Gateway Timeout
DeadlineExceeded = 4,

// Some requested entity (e.g., file or directory) was not found.
//
// Note to server developers: if a request is denied for an entire class
// of users, such as gradual feature rollout or undocumented whitelist,
// `NOT_FOUND` may be used. If a request is denied for some users within
// a class of users, such as user-based access control, `PERMISSION_DENIED`
// must be used.
//
// HTTP Mapping: 404 Not Found
NotFound = 5,

// The entity that a client attempted to create (e.g., file or directory)
// already exists.
//
// HTTP Mapping: 409 Conflict
AlreadyExist = 6,

// The caller does not have permission to execute the specified
// operation. `PERMISSION_DENIED` must not be used for rejections
// caused by exhausting some resource (use `RESOURCE_EXHAUSTED`
// instead for those errors). `PERMISSION_DENIED` must not be
// used if the caller can not be identified (use `UNAUTHENTICATED`
// instead for those errors). This error code does not imply the
// request is valid or the requested entity exists or satisfies
// other pre-conditions.
//
// HTTP Mapping: 403 Forbidden
PermissionDenied = 7,

// Some resource has been exhausted, perhaps a per-user quota, or
// perhaps the entire file system is out of space.
//
// HTTP Mapping: 429 Too Many Requests
ResourceExhausted = 8,

// The operation was rejected because the system is not in a state
// required for the operation's execution.  For example, the directory
// to be deleted is non-empty, an rmdir operation is applied to
// a non-directory, etc.
//
// Service implementors can use the following guidelines to decide
// between `FAILED_PRECONDITION`, `ABORTED`, and `UNAVAILABLE`:
//  (a) Use `UNAVAILABLE` if the client can retry just the failing call.
//  (b) Use `ABORTED` if the client should retry at a higher level
//      (e.g., when a client-specified test-and-set fails, indicating the
//      client should restart a read-modify-write sequence).
//  (c) Use `FAILED_PRECONDITION` if the client should not retry until
//      the system state has been explicitly fixed.  E.g., if an "rmdir"
//      fails because the directory is non-empty, `FAILED_PRECONDITION`
//      should be returned since the client should not retry unless
//      the files are deleted from the directory.
//
// HTTP Mapping: 400 Bad Request
FailedPrecondition = 9,

// The operation was aborted, typically due to a concurrency issue such as
// a sequencer check failure or transaction abort.
//
// See the guidelines above for deciding between `FAILED_PRECONDITION`,
// `ABORTED`, and `UNAVAILABLE`.
//
// HTTP Mapping: 409 Conflict
Aborted = 10,

// The operation was attempted past the valid range.  E.g., seeking or
// reading past end-of-file.
//
// Unlike `INVALID_ARGUMENT`, this error indicates a problem that may
// be fixed if the system state changes. For example, a 32-bit file
// system will generate `INVALID_ARGUMENT` if asked to read at an
// offset that is not in the range [0,2^32-1], but it will generate
// `OUT_OF_RANGE` if asked to read from an offset past the current
// file size.
//
// There is a fair bit of overlap between `FAILED_PRECONDITION` and
// `OUT_OF_RANGE`.  We recommend using `OUT_OF_RANGE` (the more specific
// error) when it applies so that callers who are iterating through
// a space can easily look for an `OUT_OF_RANGE` error to detect when
// they are done.
//
// HTTP Mapping: 400 Bad Request
OutOfRange = 11,

// The operation is not implemented or is not supported/enabled in this
// service.
//
// HTTP Mapping: 501 Not Implemented
Unimplemented = 12,

// Internal errors.  This means that some invariants expected by the
// underlying system have been broken.  This error code is reserved
// for serious errors.
//
// HTTP Mapping: 500 Internal Server Error
Internal = 13,

// The service is currently unavailable.  This is most likely a
// transient condition, which can be corrected by retrying with
// a backoff. Note that it is not always safe to retry
// non-idempotent operations.
//
// See the guidelines above for deciding between `FAILED_PRECONDITION`,
// `ABORTED`, and `UNAVAILABLE`.
//
// HTTP Mapping: 503 Service Unavailable
Unavailable = 14,

// Unrecoverable data loss or corruption.
//
// HTTP Mapping: 500 Internal Server Error
DataLoss = 15,

// Unauthenticated indicates the request does not have valid
	// authentication credentials for the operation.
	//
	// The gRPC framework will generate this error code when the
	// authentication metadata is invalid or a Credentials callback fails,
	// but also expect authentication middleware to generate it.
Unauthenticated = 16
}

/**
 * Non da mai eccezione.
 * Restituisce sempre l'errore, che può essere null.
 */
export async function safeAxiosPost<T>(axios: AxiosInstance, url: string, body: any, options?: any | undefined): Promise<[ T | null, { code: number, message: string } | null ]> {
  let internalOptions: any = {}
  if (options !== undefined) {
    internalOptions = Object.assign({}, options)
  }
  internalOptions.validateStatus = () => true
  try {
    const response = await axios.post(url, body, internalOptions)
    if (response.status !== 200) {
      return [null, response.data.error]
    } else {
      return [response.data, null]
    }
  } catch (e: any) {
    return [null, {
      code: Code.Unknown,
      message: e.toString()
    }]
  }
}

export async function safeAxiosGet<T>(axios: AxiosInstance, url: string, options?: any | undefined): Promise<[ T | null, { code: number, message: string } | null ]> {
  let internalOptions: any = {}
  if (options !== undefined) {
    internalOptions = Object.assign({}, options)
  }
  internalOptions.validateStatus = () => true
  try {
    const response = await axios.get(url, internalOptions)
    if (response.status !== 200) {
      return [null, response.data.error]
    } else {
      return [response.data, null]
    }
  } catch (e: any) {
    return [null, {
      code: Code.Unknown,
      message: e.toString()
    }]
  }
}

// fetch () {
//     const [res, err] = await safeAxiosPost<any>(this.$axios, '/url/to/api', {
//         value: 'ecc'
//     })
//     if (err !== null) {
//       // gestire errore con codice
//       if (err.code === Code.NotFound) {
//         this.error = 'product_not_found'
//       } else if (err.code === Code.InvalidArgument) {
//         this.error = 'invalid_product_data'
//       } else {
//         // this.error = 'there_was_an_error'
//         throw err
//       }
//       return
//     }
//     this.product = res.product
//     // usa response

//     const [res, err] = await safeAxiosPost<GetPublicOrganizationResponse>(axios, '/url/to/api', {
//         value: 'ecc'
//     }, {
//         headers: {
//             // asdvhbasdkjhvbas: kaohsbyfdouaisydv
//         }
//     })
//     if (err !== null) {
//         // gestire errore con codice
//     }
//     // usa response

// }
