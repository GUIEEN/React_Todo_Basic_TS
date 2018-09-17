```bash
touch webpack.config.js index.html
npm init -y

npm i react react-dom
npm i webpack webpack-cli webpack-dev-server@^3.1.8 -D

npm i typescript awesome-typescript-loader -D
```

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: []
};
```

```bash
touch tsconfig.json
```

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "jsx": "react",
    "module": "commonjs",
    "noImplicitAny": true,
    "outDir": "./build/",
    "preserveConstEnums": true,
    "removeComments": true,
    "sourceMap": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

```bash
npm i @types/react @types/react-dom -D
```

```js
"scripts": {
  "start": "webpack-dev-server"
},
```

# 3

```html
<body>
  <div class="container"></div>
  <!-- <script src="/bundle.js"></script> --> 삭제
</body>
```

위에 것을 지우고, `html-webpack-plugin`으로 hot reloading 을 할거임.

```bash
npm i html-webpack-plugin -D
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
```

```bash
npm i source-map-loader -D
npm i extract-text-webpack-plugin css-loader sass-loader node-sass -D
npm i -D extract-text-webpack-plugin@next
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin('style.css')
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};
```

```ts
// App.tsx
import * as React from 'react';

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentTask: '',
      tasks: []
    };
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.setState({
      currentTask: '',
      tasks: [...this.state.tasks, this.state.currentTask]
    });
  }
  // <props, state>
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>React Typescript Todo List</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add a Task"
            value={this.state.currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    );
  }
}

interface IState {
  currentTask: string;
  tasks: Array<string>;
}
```

# 5

```js
import * as React from 'react';

export class App extends React.Component<{}, IState> {
  // <props, state>
  constructor(props: {}) {
    super(props);

    this.state = { currentTask: '', tasks: [] };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentTask: '',
      tasks: [...this.state.tasks, this.state.currentTask]
    });
  }
  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: string, index: number) => (
      <div key={index}>{task}</div>
    ));
  }

  public render(): JSX.Element {
    console.log(this.state);
    return (
      <div>
        <h1>React Typescript Todo List</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add a Task"
            value={this.state.currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }
}

interface IState {
  currentTask: string;
  tasks: Array<string>;
}
```

# 6
