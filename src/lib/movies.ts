export type Movie = {
  id: string
  title: string
  genre: string[]
  director: string
  cast: string[]
  rating: number // IMDb style 1-10
  year: number
  synopsis: string
  duration: string
  price: number
  showtimes: string[]
  neonColor: string // For the glowing border aesthetic
}

export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'Blade Runner 2049',
    genre: ['Sci-Fi', 'Thriller', 'Mystery'],
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
    rating: 8.0,
    year: 2017,
    synopsis: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.',
    duration: '2h 44m',
    price: 15.99,
    showtimes: ['18:00', '21:30', '23:45'],
    neonColor: 'var(--color-primary)'
  },
  {
    id: 'm2',
    title: 'Ghost in the Shell',
    genre: ['Sci-Fi', 'Action', 'Animation'],
    director: 'Mamoru Oshii',
    cast: ['Atsuko Tanaka', 'Iemasa Kayumi', 'Akio Ôtsuka'],
    rating: 7.9,
    year: 1995,
    synopsis: 'A cyborg policewoman and her partner hunt a mysterious and powerful hacker called the Puppet Master.',
    duration: '1h 23m',
    price: 12.50,
    showtimes: ['17:15', '19:45', '22:00'],
    neonColor: 'var(--color-secondary)'
  },
  {
    id: 'm3',
    title: 'The Matrix',
    genre: ['Sci-Fi', 'Action'],
    director: 'The Wachowskis',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    rating: 8.7,
    year: 1999,
    synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    duration: '2h 16m',
    price: 14.00,
    showtimes: ['16:00', '20:00', '00:15'],
    neonColor: '#00FF41' // Classic matrix green
  },
  {
    id: 'm4',
    title: 'Akira',
    genre: ['Sci-Fi', 'Action', 'Animation'],
    director: 'Katsuhiro Ôtomo',
    cast: ['Mitsuo Iwata', 'Nozomu Sasaki', 'Mami Koyama'],
    rating: 8.0,
    year: 1988,
    synopsis: 'A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath.',
    duration: '2h 4m',
    price: 13.50,
    showtimes: ['15:30', '19:00', '21:15'],
    neonColor: '#FF003C' // Cyberpunk red
  },
  {
    id: 'm5',
    title: 'Altered Carbon: Resleeved',
    genre: ['Sci-Fi', 'Action', 'Animation'],
    director: 'Takeru Nakajima',
    cast: ['Tatsuhisa Suzuki', 'Rina Satou', 'Ayaka Asai'],
    rating: 6.5,
    year: 2020,
    synopsis: 'On the planet Latimer, Takeshi Kovacs must protect a tattooist while investigating the death of a yakuza boss.',
    duration: '1h 14m',
    price: 11.99,
    showtimes: ['14:00', '18:20', '20:45'],
    neonColor: 'var(--color-accent)'
  }
]
