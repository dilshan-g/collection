import banknotes from '../data/banknotes'
import coins from '../data/coins'

export default {
  banknotes,
  coins,
  items: [...banknotes, ...coins]
}
