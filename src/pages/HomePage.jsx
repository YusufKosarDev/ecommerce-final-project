import BestsellerProducts from '../components/home/BestsellerProducts'
import EditorsPick from '../components/home/EditorsPick'
import FeaturedPosts from '../components/home/FeaturedPosts'
import HeroSlider from '../components/home/HeroSlider'
import NeuralUniverse from '../components/home/NeuralUniverse'

function HomePage() {
  return (
    <>
      <HeroSlider />
      <EditorsPick />
      <BestsellerProducts />
      <NeuralUniverse />
      <FeaturedPosts />
    </>
  )
}

export default HomePage
