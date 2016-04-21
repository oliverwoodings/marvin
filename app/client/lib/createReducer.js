export default function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (action && handlers.hasOwnProperty(action.type)) {
      let handler = handlers[action.type]

      if (!(handler instanceof Array)) {
        handler = [handler]
      }

      return handler.reduce((state, handler) => {
        return handler(state, action.payload, action)
      }, state)
    } else {
      return state
    }
  }
}
