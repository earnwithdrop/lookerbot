require 'marky_markov'

a = MarkyMarkov::TemporaryDictionary.new
a.parse_file('eric_arnold.txt')

sentences = (1..10).to_a.map do
  a.generate_n_sentences(1)
end.join("\n\n")

puts sentences