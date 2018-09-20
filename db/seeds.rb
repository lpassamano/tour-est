nonexistence, meowseum = CulturalCenter.create!([
  { name: "The Museum of Nonexistence"},
  { name: "Meowseum" }
])

leap, user123, penny_cat = StaffUser.create!([
  {
    username: "leap",
    password: "bananafeet",
    password_confirmation: "bananafeet",
    cultural_center: nonexistence
  },
  {
    username: "user123",
    password: "bananafeet",
    password_confirmation: "bananafeet",
    cultural_center: nonexistence
  },
  {
    username: "penny_cat",
    password: "bananafeet",
    password_confirmation: "bananafeet",
    cultural_center: meowseum
  }
])

awesome, _women = Tour.create!([
  {
    title: "Awesome Tour",
    starting_point: "Your imagination...",
    estimated_time: "1 hour",
    description: "All of the world's greatest art in one tour.",
    staff_user: leap,
    cultural_center: nonexistence
  },
  {
    title: "Women Artists",
    description: "Great work by women artists",
    staff_user: leap,
    cultural_center: nonexistence
  },

])

cats = Tour.create!(
  {
    title: "Cats in Art",
    staff_user: penny_cat,
    cultural_center: meowseum
  }
)

stolen = Tour.create!(
  {
    title: "Stolen Artwork",
    estimated_time: "1 hour",
    description: "A look at some art that has been aquired through dubious means.",
    staff_user: user123,
    cultural_center: nonexistence
  }
)

Point.create!([
  {
    tour: awesome,
    title: "Melencholia",
    description: "Dürer's Melencolia I is one of three large prints of 1513 and 1514 known as his Meisterstiche (master engravings). The other two are Knight, Death, and the Devil (43.106.2) and Saint Jerome in His Study. The three are in no way a series, but they do correspond to the three kinds of virtue in medieval scholasticism--moral, theological, and intellectual--and they embody the complexity of Dürer's thought and that of his age.",
    caption: "Albrecht Dürer (German, 1471-1528)\n1514, Engraving",
    location: "Metropolitan Museum of Art",
    image: {
      io: Rails.root.join("spec", "fixtures", "melancholia.jpeg").open,
      filename: 'melancholia.jpeg',
      content_type: 'image/jpeg'
    },
    order_key: 3
  },
  {
    tour: awesome,
    title: "Mona Lisa",
    description: "The title of the painting, which is known in English as Mona Lisa, comes from a description by Renaissance art historian Giorgio Vasari, who wrote 'Leonardo undertook to paint, for Francesco del Giocondo, the portrait of Mona Lisa, his wife.' Mona in Italian is a polite form of address originating as 'ma donna' – similar to 'Ma’am', 'Madam', or my lady' in English. This became 'madonna', and its contraction 'mona'.",
    caption: "Leonard da Vinci (Italian, 1452-1519)\n1503-06, Oil on poplar panel",
    location: "Musée du Louvre",
    order_key: 1
  },
  {
    tour: awesome,
    title: "Garden of Earthly Delights",
    description: "As so little is known of Bosch's life or intentions, interpretations of his intent have ranged from an admonition of worldly fleshy indulgence, to a dire warning on the perils of life's temptations, to an evocation of ultimate sexual joy. The intricacy of its symbolism, particularly that of the central panel, has led to a wide range of scholarly interpretations over the centuries. Twentieth-century art historians are divided as to whether the triptych's central panel is a moral warning or a panorama of paradise lost. It is not known whether The Garden was intended as an altarpiece, but the general view is that the extreme subject matter of the inner center and right panels make it unlikely that it was intended to function in a church or monastery, but was instead commissioned by a lay patron.",
    caption: "Hieronymous Bosch (Dutch, 1450-1516)\n1490-1510, Oil on oak panels",
    location: "Museo del Prado",
    order_key: 2
  },
  {
    tour: awesome,
    title: "Winged Victory of Samothrace",
    description: 'The Winged Victory of Samothrace, also called the Nike of Samothrace, is a marble Hellenistic sculpture of Nike (the Greek goddess of victory), that was created about the 2nd century BC. Since 1884, it has been prominently displayed at the Louvre and is one of the most celebrated sculptures in the world. H.W. Janson described it as "the greatest masterpiece of Hellenistic sculpture", and it is one of a small number of major Hellenistic statues surviving in the original, rather than Roman copies.',
    caption: 'c. 200-190 BC, Parian marble',
    location: "Musée du Louvre",
    order_key: 0
  },
  {
    tour: awesome,
    title: "Starry Night",
    description: 'The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an idealized village. It has been in the permanent collection of the Museum of Modern Art in New York City since 1941, acquired through the Lillie P. Bliss Bequest. Regarded as among Van Gogh\'s finest works, The Starry Night is one of the most recognized paintings in the history of Western culture.',
    caption: "Vincent van Gogh (Dutch, 1853-1890)\n1889, Oil on canvas",
    location: "Museum of Modern Art",
    order_key: 4
  },
  {
    tour: awesome,
    title: "Object",
    description: "This Surrealist object was inspired by a conversation between Oppenheim and artists Pablo Picasso and Dora Maar at a Paris cafe. Admiring Oppenheim's fur-covered bracelet, Picasso remarked that one could cover anything with fur, to which she replied, \"Even this cup and saucer.\" Soon after, when asked by André Breton, Surrealism's leader, to participate in the first Surrealist exhibition dedicated to objects, Oppenheim bought a teacup, saucer, and spoon at a department store and covered them with the fur of a Chinese gazelle. In so doing, she transformed genteel items traditionally associated with feminine decorum into sensuous, sexually punning tableware.",
    caption: 'Meret Oppenheim (Swiss, 1913-1985)\n1936, Fur-covered cup, saucer, and spoon',
    location: "Museum of Modern Art",
    order_key: 5
  },
  {
    tour: awesome,
    title: "Shirin Neshat",
    description: 'In Rebellious Silence, the central figure’s portrait is bisected along a vertical seam created by the long barrel of a rifle. Presumably the rifle is clasped in her hands near her lap, but the image is cropped so that the gun rises perpendicular to the lower edge of the photo and grazes her face at the lips, nose, and forehead. The woman\'s eyes stare intensely towards the viewer from both sides of this divide. Shirin Neshat’s photographic series "Women of Allah" examines the complexities of women’s identities in the midst of a changing cultural landscape in the Middle East—both through the lens of Western representations of Muslim women, and through the more intimate subject of personal and religious conviction.',
    caption: "Shirin Neshat (Persian, 1957- )\n1994, B&W RC print & ink",
    location: "Gladstone Gallery",
    order_key: 6
  },
  # {
  #   tour: women,
  #   title: "Artemisia Gentileschi"
  #   description:
  #   caption:
  #   location:
  #   directions:
  #   order_key:
  # },
  # {
  #   tour: women,
  #   title: "Howardina Pindelle"
  #   # description:
  #   # caption:
  #   # location:
  #   # directions:
  #   order_key:
  # },
  # {
  #   tour: women,
  #   title: "Mary Cassat"
  #   # description:
  #   # caption:
  #   # location:
  #   # directions:
  #   order_key:
  # },
  # {
  #   tour: women,
  #   title: "Vigge LeBrun"
  #   # description:
  #   # caption:
  #   # location:
  #   # directions:
  #   order_key:
  # },
  # {
  #   tour: women,
  #   title: "Miriam Schapiro"
  #   # description:
  #   # caption:
  #   # location:
  #   # directions:
  #   order_key:
  # },
  # {
  #   tour: women,
  #   title: "Amy Sherald"
  #   # description:
  #   # caption:
  #   # location:
  #   # directions:
  #   order_key:
  # },
  {
    tour: stolen,
    title: "Parthenon Marbles",
    description: "The Parthenon Marbles, are a collection of Classical Greek marble sculptures made under the supervision of the architect and sculptor Phidias and his assistants. They were originally part of the temple of the Parthenon and other buildings on the Acropolis of Athens. From 1801 to 1812, agents of Thomas Bruce, 7th Earl of Elgin removed about half of the surviving sculptures of the Parthenon and transported them to Britain, which are now housed in the British Museum. The Greek government and several organizations continue to urge the British Museum to return the marbles, but the museum refuses to restore the sculptures to their home country.",
    caption: "Phidias\nc. 447-438 BC, Marble",
    order_key: 0
  },
  {
    tour: stolen,
    title: "Chaz Tortoni",
    description: "Chez Tortoni is one of the 13 works fo art stolen from the Isabella Stewart Gardner Museum on March 18, 1990. The heist is the largest-value recorded theft of private property in history.",
    caption: "Edouard Manet\nc.1878-1880, Oil on canvas",
    order_key: 1
  },
  {
    tour: stolen,
    title: "Portrait of Adele Bloch-Bauer I",
    description: "Portrait of Adele Bloch-Bauer I (also called The Lady in Gold or The Woman in Gold) is a painting by Gustav Klimt, completed between 1903 and 1907. The portrait was commissioned by the sitter's husband, Ferdinand Bloch-Bauer, a Jewish banker and sugar producer. The painting was stolen by the Nazis in 1941 and displayed at the Österreichische Galerie Belvedere. In 2006, following eight years of effort by the Bloch-Bauer heirs, the painting was returned to the family; it was sold the same year for $135 million, at the time a record price for a painting.",
    caption: "Gustav Klimt\n1907, Oil, silver, and gold on canvas",
    order_key: 2
  },
  {
    tour: stolen,
    title: "Gold and lapis bowl from Ur",
    description: "The National Museum of Iraq was  looted during and after the 2003 Invasion of Iraq. Despite international efforts, only some of the stolen artifacts were returned. The looting is regarded as one of the worst acts of cultural vandalism in modern times, but much more of Iraq’s rich cultural history has been destroyed, damaged or  stolen in the years since.",
    order_key: 3
  },
  # {
  #   tour: stolen,
  #   title: "African example",
  #   description: "That scene from Black Panther was more true than you realize!" works with no real provenance
  #   # caption:
  #   # location:
  #   # directions:
  #   order_key: 4
  # },
  # {
  #   tour: stolen,
  #   title: "NA objects"
  #   # description:
  #   # caption:
  #   # location:
  #   # directions:
  #   order_key: 5
  # },
  {
    tour: cats,
    title: "Cat goddes Bastet",
    caption: "Bronze statue",
    order_key: 0
  },
  {
    tour: cats,
    title: "Birth of Felinus",
    order_key: 1
  }
])
