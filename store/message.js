let messageCount = 0;

export const state = () => ({
  list: [ ]
})

export const mutations = {
  add(state, message) {
    message.id = messageCount++;
    message.created = Date.now();
    state.list.push(message);
  },
  remove(state, message) {
    state.list = _.reject(state.list, (_message) => {
      return _message.id === message.id;
    })
  },
  expire(state) {
    let now = Date.now();
    state.list = _.reject(state.list, (message) => {
      let difference = (now - message.created) / 1000;
      return message.timeout && difference >= message.timeout;
    });
  }
}
