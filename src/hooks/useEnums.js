import { rentTimeUnits } from '@/enums'

/**
 * @i 传入内部函数，是当前选中的动态对象
 */
export function useEnums() {
  const getPrice = (i, type) => {
    const propEnum = {
      partTimeJob: 'partjobPrice',
      tenement: 'rentPrice',
      resell: 'resalePrice',
    }
    return i[propEnum[type]] || '-'
  }
  const getUnit = (i, type) => {
    const propEnum = {
      partTimeJob: 'partjobTimeunit',
      tenement: 'rentTimeunit',
      // resell: 'resalePrice',
    }
    console.log(22, i, type)
    return rentTimeUnits[i[propEnum[type]] || 1]
  }

  return {
    getPrice,
    getUnit,
  }
}
