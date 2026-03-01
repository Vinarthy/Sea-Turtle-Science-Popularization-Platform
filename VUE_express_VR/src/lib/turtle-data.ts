export interface TurtleSpecies {
  id: string
  name: string
  genus: string
  family: string
  alias?: string
  description: string
  habitat: string
  conservation: string
  size: string
}

export interface TurtleGenus {
  id: string
  name: string
  family: string
  species: TurtleSpecies[]
}

export interface TurtleFamily {
  id: string
  name: string
  genera: TurtleGenus[]
}

export const turtleFamilies: TurtleFamily[] = [
  {
    id: 'cheloniidae',
    name: '海龟科',
    genera: [
      {
        id: 'chelonia',
        name: '绿海龟属',
        family: '海龟科',
        species: [
          {
            id: 'green-turtle',
            name: '绿海龟',
            genus: '绿海龟属',
            family: '海龟科',
            description:
              '绿海龟是海龟科中体型最大的种类之一，因其体内脂肪呈绿色而得名。广泛分布于热带和亚热带海域，是重要的海洋生态指示物种。',
            habitat: '热带和亚热带海域，常见于珊瑚礁、海草床附近',
            conservation: '濒危（EN）',
            size: '体长80-150cm，体重70-230kg',
          },
        ],
      },
      {
        id: 'caretta',
        name: '红海龟属',
        family: '海龟科',
        species: [
          {
            id: 'loggerhead',
            name: '红海龟',
            genus: '红海龟属',
            family: '海龟科',
            alias: '赤蠵龟',
            description:
              '红海龟又名赤蠵龟，头部较大，颚部强壮有力。分布于大西洋、太平洋和印度洋的温带至热带海域，以底栖无脊椎动物为食。',
            habitat: '温带至热带海域，喜好沿岸浅海区域',
            conservation: '易危（VU）',
            size: '体长70-120cm，体重80-200kg',
          },
        ],
      },
      {
        id: 'eretmochelys',
        name: '玳瑁属',
        family: '海龟科',
        species: [
          {
            id: 'hawksbill',
            name: '玳瑁',
            genus: '玳瑁属',
            family: '海龟科',
            description:
              '玳瑁以其美丽的龟甲花纹而闻名，嘴部呈鹰喙状。主要栖息于珊瑚礁区域，以海绵等为主食，对维持珊瑚礁生态系统健康有重要作用。',
            habitat: '热带珊瑚礁海域',
            conservation: '极危（CR）',
            size: '体长60-100cm，体重45-70kg',
          },
        ],
      },
      {
        id: 'lepidochelys',
        name: '丽龟属',
        family: '海龟科',
        species: [
          {
            id: 'kemps-ridley',
            name: '肯氏丽龟',
            genus: '丽龟属',
            family: '海龟科',
            description:
              '肯氏丽龟是海龟中体型最小的种类，仅分布于大西洋西部和墨西哥湾。以集群上岸产卵的壮观场面而著名。',
            habitat: '大西洋西部、墨西哥湾浅海区域',
            conservation: '极危（CR）',
            size: '体长55-75cm，体重30-50kg',
          },
          {
            id: 'olive-ridley',
            name: '太平洋丽龟',
            genus: '丽龟属',
            family: '海龟科',
            description:
              '太平洋丽龟是世界上数量最多的海龟种类之一，常在特定海滩进行大规模集群产卵，场面十分壮观。',
            habitat: '太平洋、印度洋热带海域',
            conservation: '易危（VU）',
            size: '体长55-80cm，体重30-50kg',
          },
        ],
      },
      {
        id: 'natator',
        name: '平背龟属',
        family: '海龟科',
        species: [
          {
            id: 'flatback',
            name: '平背龟',
            genus: '平背龟属',
            family: '海龟科',
            description:
              '平背龟因其扁平的背甲而得名，是唯一仅分布于澳大利亚沿海的海龟种类。其活动范围较为局限，主要在大陆架浅水区域。',
            habitat: '澳大利亚北部沿海浅水区域',
            conservation: '高度濒危',
            size: '体长76-96cm，体重70-90kg',
          },
        ],
      },
    ],
  },
  {
    id: 'dermochelyidae',
    name: '棱皮龟科',
    genera: [
      {
        id: 'dermochelys',
        name: '棱皮龟属',
        family: '棱皮龟科',
        species: [
          {
            id: 'leatherback',
            name: '棱皮龟',
            genus: '棱皮龟属',
            family: '棱皮龟科',
            description:
              '棱皮龟是现存最大的海龟，也是世界上第四大爬行动物。其甲壳由皮革状的皮肤覆盖，而非角质鳞片，背部有七条纵向棱脊。',
            habitat: '全球热带至亚极地海域，为远洋性海龟',
            conservation: '易危（VU）',
            size: '体长130-180cm，体重250-700kg',
          },
        ],
      },
    ],
  },
]

export function getAllSpecies(): TurtleSpecies[] {
  const species: TurtleSpecies[] = []
  for (const family of turtleFamilies) {
    for (const genus of family.genera) {
      species.push(...genus.species)
    }
  }
  return species
}

export function getAllGenera(): TurtleGenus[] {
  const genera: TurtleGenus[] = []
  for (const family of turtleFamilies) {
    genera.push(...family.genera)
  }
  return genera
}
