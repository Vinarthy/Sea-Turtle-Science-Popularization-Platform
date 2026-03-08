<template>
  <section class="lifecycle">
    <div class="container">
      <h2 class="title">海龟的生命周期</h2>

      <!-- 物种选择 -->
      <div class="species-selector">
        <button
          v-for="species in turtleSpecies"
          :key="species.id"
          :class="['species-btn', selectedSpecies.id === species.id ? 'active' : '']"
          @click="selectedSpecies = species"
        >
          {{ species.name }}
        </button>
      </div>

      <!-- 生命周期布局 -->
      <div class="grid-layout">
        <!-- 卵 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/egg.jpg'"
          :title="selectedSpecies.stages.egg.title"
          :description="selectedSpecies.stages.egg.description"
          position="top-left"
        />

        <div class="arrow">←</div>

        <!-- 成年 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/adult.jpg'"
          :title="selectedSpecies.stages.adult.title"
          :description="selectedSpecies.stages.adult.description"
          position="top-right"
        />

        <div class="arrow">↓</div>

        <!-- 中间分布 -->
        <div class="distribution">
          <img :src="selectedSpecies.folder + '/distribution.jpg'" alt="distribution" />

          <div class="dist-text">
            <h3>分布区域</h3>
            <p>{{ selectedSpecies.distribution }}</p>
          </div>
        </div>

        <div class="arrow">↑</div>

        <!-- 稚龟 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/hatchling.jpg'"
          :title="selectedSpecies.stages.hatchling.title"
          :description="selectedSpecies.stages.hatchling.description"
          position="bottom-left"
        />

        <div class="arrow">→</div>

        <!-- 幼龟 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/juvenile.jpg'"
          :title="selectedSpecies.stages.juvenile.title"
          :description="selectedSpecies.stages.juvenile.description"
          position="bottom-right"
        />
      </div>

      <p class="bottom-tip">点击上方按钮切换不同海龟种类，查看其生命周期</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StageCard from './StageCard.vue'

const turtleSpecies = [
  {
    id: 'green-turtle',
    name: '绿海龟',
    folder: '/lifecycle/green-turtle',

    stages: {
      egg: {
        title: '卵期',
        description:
          '成年雌性海龟会回到自己出生的海滩，在夜间用后肢挖掘沙坑产卵，每次可产下90-180枚卵\n海龟的性别由孵化温度决定——温度较高时多孵化出雌性，温度较低时多孵化出雄性',
      },
      hatchling: {
        title: '幼年期',
        description:
          '刚孵化的小海龟通常在夜间集体破沙而出，凭借本能朝着月光反射的海面方向爬行;这次爬行不仅锻炼肌肉，还会"印记"出生海滩的位置，为几十年后返乡繁殖奠定基础',
      },
      juvenile: {
        title: '青年期',
        description: '当海龟长到餐盘大小时，会从远洋迁移到营养丰富的近岸海域，建立觅食地并继续成长',
      },
      adult: {
        title: '成年期',
        description:
          '成熟后，海龟会凭借"内置GPS"回到出生地附近海域交配，雌性再次上岸产卵，完成生命循环',
      },
    },

    distribution: '绿海龟分布于全球热带海域',
  },

  {
    id: 'hawksbill',
    name: '玳瑁',
    folder: '/lifecycle/hawksbill',

    stages: {
      egg: {
        title: '卵期',
        description:
          '成年雌性海龟会回到自己出生的海滩，在夜间用后肢挖掘沙坑产卵，每次可产下90-180枚卵\n海龟的性别由孵化温度决定——温度较高时多孵化出雌性，温度较低时多孵化出雄性',
      },
      hatchling: {
        title: '幼年期',
        description:
          '刚孵化的小海龟通常在夜间集体破沙而出，凭借本能朝着月光反射的海面方向爬行;这次爬行不仅锻炼肌肉，还会"印记"出生海滩的位置，为几十年后返乡繁殖奠定基础',
      },
      juvenile: {
        title: '青年期',
        description: '当海龟长到餐盘大小时，会从远洋迁移到营养丰富的近岸海域，建立觅食地并继续成长',
      },
      adult: {
        title: '成年期',
        description:
          '成熟后，海龟会凭借"内置GPS"回到出生地附近海域交配，雌性再次上岸产卵，完成生命循环',
      },
    },

    distribution: '玳瑁主要分布在热带珊瑚礁',
  },
  {
    id: 'Carettacaretta',
    name: '红海龟',
    folder: '/lifecycle/Carettacaretta',

    stages: {
      egg: {
        title: '卵期',
        description:
          '成年雌性海龟会回到自己出生的海滩，在夜间用后肢挖掘沙坑产卵，每次可产下90-180枚卵\n海龟的性别由孵化温度决定——温度较高时多孵化出雌性，温度较低时多孵化出雄性',
      },
      hatchling: {
        title: '幼年期',
        description:
          '刚孵化的小海龟通常在夜间集体破沙而出，凭借本能朝着月光反射的海面方向爬行;这次爬行不仅锻炼肌肉，还会"印记"出生海滩的位置，为几十年后返乡繁殖奠定基础',
      },
      juvenile: {
        title: '青年期',
        description: '当海龟长到餐盘大小时，会从远洋迁移到营养丰富的近岸海域，建立觅食地并继续成长',
      },
      adult: {
        title: '成年期',
        description:
          '成熟后，海龟会凭借"内置GPS"回到出生地附近海域交配，雌性再次上岸产卵，完成生命循环',
      },
    },

    distribution: '红海龟主分布在温带—热带海域',
  },
  {
    id: 'Lepidochelysolivacea',
    name: '太平洋丽龟',
    folder: '/lifecycle/Lepidochelysolivacea',

    stages: {
      egg: {
        title: '卵期',
        description:
          '成年雌性海龟会回到自己出生的海滩，在夜间用后肢挖掘沙坑产卵，每次可产下90-180枚卵\n海龟的性别由孵化温度决定——温度较高时多孵化出雌性，温度较低时多孵化出雄性',
      },
      hatchling: {
        title: '幼年期',
        description:
          '刚孵化的小海龟通常在夜间集体破沙而出，凭借本能朝着月光反射的海面方向爬行;这次爬行不仅锻炼肌肉，还会"印记"出生海滩的位置，为几十年后返乡繁殖奠定基础',
      },
      juvenile: {
        title: '青年期',
        description: '当海龟长到餐盘大小时，会从远洋迁移到营养丰富的近岸海域，建立觅食地并继续成长',
      },
      adult: {
        title: '成年期',
        description:
          '成熟后，海龟会凭借"内置GPS"回到出生地附近海域交配，雌性再次上岸产卵，完成生命循环',
      },
    },

    distribution: '太平洋丽龟分布在全球热带、亚热带海域',
  },
  {
    id: 'Lepidochelyskempii',
    name: '肯氏丽龟',
    folder: '/lifecycle/Lepidochelyskempii',

    stages: {
      egg: {
        title: '卵期',
        description:
          '成年雌性海龟会回到自己出生的海滩，在夜间用后肢挖掘沙坑产卵，每次可产下90-180枚卵\n海龟的性别由孵化温度决定——温度较高时多孵化出雌性，温度较低时多孵化出雄性',
      },
      hatchling: {
        title: '幼年期',
        description:
          '刚孵化的小海龟通常在夜间集体破沙而出，凭借本能朝着月光反射的海面方向爬行;这次爬行不仅锻炼肌肉，还会"印记"出生海滩的位置，为几十年后返乡繁殖奠定基础',
      },
      juvenile: {
        title: '青年期',
        description: '当海龟长到餐盘大小时，会从远洋迁移到营养丰富的近岸海域，建立觅食地并继续成长',
      },
      adult: {
        title: '成年期',
        description:
          '成熟后，海龟会凭借"内置GPS"回到出生地附近海域交配，雌性再次上岸产卵，完成生命循环',
      },
    },

    distribution: '肯氏丽龟主要分布于墨西哥湾',
  },
  {
    id: 'Dermochelyscoriacea',
    name: '棱皮龟',
    folder: '/lifecycle/Dermochelyscoriacea',

    stages: {
      egg: {
        title: '卵期',
        description:
          '成年雌性海龟会回到自己出生的海滩，在夜间用后肢挖掘沙坑产卵，每次可产下90-180枚卵\n海龟的性别由孵化温度决定——温度较高时多孵化出雌性，温度较低时多孵化出雄性',
      },
      hatchling: {
        title: '幼年期',
        description:
          '刚孵化的小海龟通常在夜间集体破沙而出，凭借本能朝着月光反射的海面方向爬行;这次爬行不仅锻炼肌肉，还会"印记"出生海滩的位置，为几十年后返乡繁殖奠定基础',
      },
      juvenile: {
        title: '青年期',
        description: '当海龟长到餐盘大小时，会从远洋迁移到营养丰富的近岸海域，建立觅食地并继续成长',
      },
      adult: {
        title: '成年期',
        description:
          '成熟后，海龟会凭借"内置GPS"回到出生地附近海域交配，雌性再次上岸产卵，完成生命循环',
      },
    },

    distribution: '棱皮龟广泛分布于全球',
  },
  {
    id: 'Natatordepressus',
    name: '平背龟',
    folder: '/lifecycle/Natatordepressus',

    stages: {
      egg: {
        title: '卵期',
        description:
          '成年雌性海龟会回到自己出生的海滩，在夜间用后肢挖掘沙坑产卵，每次可产下90-180枚卵\n海龟的性别由孵化温度决定——温度较高时多孵化出雌性，温度较低时多孵化出雄性',
      },
      hatchling: {
        title: '幼年期',
        description:
          '刚孵化的小海龟通常在夜间集体破沙而出，凭借本能朝着月光反射的海面方向爬行;这次爬行不仅锻炼肌肉，还会"印记"出生海滩的位置，为几十年后返乡繁殖奠定基础',
      },
      juvenile: {
        title: '青年期',
        description: '当海龟长到餐盘大小时，会从远洋迁移到营养丰富的近岸海域，建立觅食地并继续成长',
      },
      adult: {
        title: '成年期',
        description:
          '成熟后，海龟会凭借"内置GPS"回到出生地附近海域交配，雌性再次上岸产卵，完成生命循环',
      },
    },

    distribution: '平背龟仅分布于澳大利亚北部沿海，为地区特有种',
  },
]

const selectedSpecies = ref(turtleSpecies[0])
</script>

<style scoped>
.lifecycle {
  padding: 80px 20px;
  background: linear-gradient(#e8f4f8, #d0e8f0);
}

.container {
  max-width: 1100px;
  margin: auto;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 40px;
}

.species-selector {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.species-btn {
  padding: 10px 22px;
  border-radius: 30px;
  border: 2px solid #003366;
  background: white;
  cursor: pointer;
  font-weight: 600;
}

.species-btn.active {
  background: #003366;
  color: white;
  transform: scale(1.05);
}

.grid-layout {
  display: grid;

  grid-template-columns: 1fr auto 1fr;

  grid-template-rows: auto auto auto;

  gap: 30px;

  align-items: center;

  justify-items: center;
}

.arrow {
  font-size: 28px;
  color: #003366;
}

.distribution {
  text-align: center;
}

.distribution img {
  width: 500px;
  height: auto;
  border-radius: 12px;
  border: 4px solid #0077b6;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.dist-text {
  margin-top: 10px;
  /* max-width: 280px; */
  text-align: center;
}

.bottom-tip {
  margin-top: 40px;
  text-align: center;
  color: #003366;
}
</style>
