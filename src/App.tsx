import Content from './containers/Content'
import Header from './containers/Header'
import Home from './screens/Home'

export default function App() {
  return (
    <>
      <Header />
      <Content>
        <Home />
      </Content>
    </>
  )
}
