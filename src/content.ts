export type Artifact = {
  id: string
  year: string
  era: string
  title: string
  kicker: string
  region: string
  medium: string
  collection: string
  image: string
  imagePosition?: string
  accent: string
  story: string
  context: string
  looking: string
  legacy: string
  sourceUrl: string
  sourceLabel: string
  credit: string
}

export const artifacts: Artifact[] = [
  {
    id: 'dancing-girl', year: 'c. 2500 BCE', era: 'INDUS VALLEY', title: 'Dancing Girl of Mohenjo-daro', kicker: 'The first spark', region: 'Mohenjo-daro, Sindh', medium: 'Cast bronze', collection: 'National Museum, New Delhi', image: '/images/dancing-girl.jpg', imagePosition: 'center', accent: '#e96f3d',
    story: 'A tiny bronze figure, hand on hip and chin lifted, carries an astonishing sense of confidence across four millennia.',
    context: 'Made in the urban Indus Valley civilisation, this 10.8 cm figure demonstrates the lost-wax casting skill and cosmopolitan craft culture of one of South Asia’s earliest cities.',
    looking: 'Her stacked bangles, long necklace and relaxed contrapposto make the sculpture feel spontaneous rather than ceremonial.',
    legacy: 'She opens the timeline with a reminder that Indian art begins not in silence, but with technical invention, adornment and an unmistakable human presence.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dancing_girl_of_Mohenjo-daro.jpg', sourceLabel: 'Wikimedia Commons', credit: 'Photo: Gary Todd · CC0',
  },
  {
    id: 'sanchi', year: 'c. 1st BCE–1st CE', era: 'SHUNGA · SATAVAHANA', title: 'Sanchi Stupa gateway relief', kicker: 'Stories in stone', region: 'Sanchi, Madhya Pradesh', medium: 'Carved sandstone', collection: 'Great Stupa No. 1, Sanchi', image: '/images/sanchi-gateway.jpg', imagePosition: 'center', accent: '#dfb34e',
    story: 'At Sanchi, stone becomes a living page: processions, trees, animals and sacred events crowd the great gateways of a Buddhist monument.',
    context: 'The toranas of the Great Stupa were added around an older Mauryan mound. Their narrative reliefs invited pilgrims to encounter the Buddha’s life through symbols and stories.',
    looking: 'This panel depicts Ashoka’s visit to the Ramagrama stupa. Notice how landscape, architecture and figures are compressed into rhythmic, ornamental space.',
    legacy: 'Sanchi shows an Indian visual language built for movement: art was encountered while walking, circling, remembering and worshipping.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ashoka%27s_visit_to_the_Ramagrama_stupa_Sanchi_Stupa_1_Southern_gateway.jpg', sourceLabel: 'Wikimedia Commons', credit: 'Photo: Dharma · CC BY 2.0',
  },
  {
    id: 'buddha', year: 'Early 5th century CE', era: 'GUPTA', title: 'Seated Buddha', kicker: 'A language of serenity', region: 'Uttar Pradesh', medium: 'Sandstone', collection: 'The Metropolitan Museum of Art', image: '/images/seated-buddha.jpg', imagePosition: 'center', accent: '#c87554',
    story: 'The calm, inward-looking face of this Buddha became a defining image of the Gupta period’s ideal of spiritual poise.',
    context: 'In northern India, workshops refined a sculptural vocabulary of soft modelling, lowered eyes and gently patterned robes. Buddhist imagery travelled widely from these artistic centres.',
    looking: 'The perfectly balanced posture and rounded halo focus attention on meditation, teaching and inner illumination rather than physical drama.',
    legacy: 'Gupta artists gave form to an enduring visual grammar for sacred images across India and beyond.',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search/38073', sourceLabel: 'The Met collection record', credit: 'The Metropolitan Museum of Art · Public Domain',
  },
  {
    id: 'padmapani', year: 'c. 5th century CE', era: 'VAKATAKA', title: 'Padmapani, Ajanta Cave 1', kicker: 'A painted world', region: 'Ajanta, Maharashtra', medium: 'Mural painting', collection: 'Ajanta Caves, Cave 1', image: '/images/padmapani.jpg', imagePosition: '45% center', accent: '#7b9b81',
    story: 'With a lotus in hand and eyes lowered in compassion, Padmapani seems to emerge from the shadowy interior of Ajanta’s painted cave.',
    context: 'Ajanta’s monasteries were active centres of Buddhist devotion and patronage. Its murals use mineral pigments, fluid contour and carefully layered colour to create inhabited sacred worlds.',
    looking: 'Follow the fine jewellery, floral details and softly turned face: these paintings reward lingering rather than a quick glance.',
    legacy: 'Ajanta’s visual richness remains a touchstone for Indian painting—devotional, narrative and deeply attentive to mood.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bodhisattva_Padmapani,_Ajanta,_cave_1,_India.jpg', sourceLabel: 'Wikimedia Commons', credit: 'Photo: Abdulsayed · CC BY-SA 3.0',
  },
  {
    id: 'nataraja', year: '10th–11th century CE', era: 'CHOLA', title: 'Shiva as Nataraja', kicker: 'The cosmos dances', region: 'Tamil Nadu', medium: 'Cast bronze', collection: 'Art Institute of Chicago', image: '/images/nataraja.jpg', imagePosition: 'center', accent: '#f4aa4f',
    story: 'Shiva dances within a ring of fire: creation, preservation, dissolution, concealment and grace held in a single, electrifying form.',
    context: 'Chola workshops in south India mastered sophisticated lost-wax bronze casting. These images were not merely displayed; they were carried in temple processions and encountered as living deities.',
    looking: 'The lifted foot promises release, while the dwarf beneath the other foot represents ignorance. Every hand, flame and curve has a role in the cosmic choreography.',
    legacy: 'Nataraja became one of the world’s most recognisable expressions of Indian art, joining spiritual philosophy with extraordinary technical fluency.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Shiva_as_Lord_of_the_Dance_(Nataraja).jpg', sourceLabel: 'Wikimedia Commons / Art Institute of Chicago', credit: 'Art Institute of Chicago · CC0',
  },
  {
    id: 'jahangir', year: '1615–1618', era: 'MUGHAL', title: 'Jahangir Preferring a Sufi Shaikh to Kings', kicker: 'Power, painted precisely', region: 'Mughal court, North India', medium: 'Opaque watercolour, ink & gold on paper', collection: 'Freer Gallery of Art', image: '/images/jahangir.jpg', imagePosition: 'center', accent: '#9d6370',
    story: 'In Bichitr’s dazzling court painting, Emperor Jahangir sits on an hourglass throne and chooses a Sufi holy man above rulers from around the world.',
    context: 'Mughal ateliers brought Persianate painting into dialogue with Indian materials, observation and imperial ambition. Albums gathered portraits, studies and paintings as precious objects.',
    looking: 'The halo mixes sun and moon, while the tiny self-portrait of the artist at lower right turns a political image into a quietly personal signature.',
    legacy: 'Mughal miniature painting set a benchmark for detail, portraiture and visual diplomacy across the subcontinent.',
    sourceUrl: 'https://www.si.edu/object/jahangir-preferring-sufi-shaikh-kings-st-petersburg-album%3Afsg_F1942.15a', sourceLabel: 'Smithsonian collection record', credit: 'Freer Gallery of Art · CC0',
  },
  {
    id: 'shakuntala', year: '1870', era: 'COLONIAL MODERNITY', title: 'Shakuntala and her companions', kicker: 'Myth, made modern', region: 'Travancore / Bombay', medium: 'Oil painting', collection: 'Raja Ravi Varma oeuvre', image: '/images/shakuntala.jpg', imagePosition: 'center', accent: '#af6641',
    story: 'Raja Ravi Varma reframed Kalidasa’s heroine Shakuntala with the theatrical naturalism of European oil painting and the emotional familiarity of Indian epic.',
    context: 'Working in colonial India, Ravi Varma adopted oil, perspective and academic realism while choosing subjects from Sanskrit literature and Hindu mythology.',
    looking: 'Shakuntala pretends to remove a thorn while secretly turning back toward Dushyanta—the whole story rests in that delicate gesture.',
    legacy: 'His widely circulated oleographs helped make mythological imagery part of everyday visual culture across India.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Raja_Ravi_Varma,_Shakuntala_and_Sakhis_(Oleographic_print).jpg', sourceLabel: 'Wikimedia Commons', credit: 'Raja Ravi Varma · Public Domain reproduction',
  },
  {
    id: 'bharat-mata', year: '1905', era: 'BENGAL SCHOOL', title: 'Bharat Mata', kicker: 'An idea takes form', region: 'Kolkata, Bengal', medium: 'Watercolour on paper', collection: 'Victoria Memorial Hall, Kolkata', image: '/images/bharat-mata.jpg', imagePosition: 'center', accent: '#d77f3a',
    story: 'Abanindranath Tagore imagined the nation as a young ascetic woman bearing food, cloth, learning and spiritual sustenance.',
    context: 'Created during the Swadeshi movement, Bharat Mata became central to the Bengal School’s search for a distinctly Indian modernism outside colonial academic conventions.',
    looking: 'Her four quiet hands hold a book, sheaves of paddy, white cloth and a rosary. The restrained palette makes the image contemplative, not triumphant.',
    legacy: 'The work closes this journey by showing art as a site of political feeling, cultural memory and new ways of imagining India.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bharat_Mata_by_Abanindranath_Tagore.jpg', sourceLabel: 'Wikimedia Commons', credit: 'Abanindranath Tagore · educational reproduction',
  },
]
