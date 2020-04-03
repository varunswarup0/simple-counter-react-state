import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const storeStateInLocalStorage = state => {
  localStorage.setItem('counterState', JSON.stringify(state));
  document.title = state.count;
  console.log('After', state.count);
};

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) return;
        return { count: state.count + step };
      },
      () => storeStateInLocalStorage(this.state),
    );

    // console.log('Before!', this.state.count);
  }

  decrement() {
    this.setState(
      state => {
        return { count: state.count - 1 };
      },
      () => storeStateInLocalStorage(this.state),
    );
  }

  reset() {
    this.setState(
      () => {
        return { count: 0 };
      },
      () => storeStateInLocalStorage(this.state),
    );
  }

  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
