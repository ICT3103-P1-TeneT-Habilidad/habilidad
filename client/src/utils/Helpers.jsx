export const formatTopicOption = (topics) => {
    if (topics !== null) {
        return topics.data.map((d) => ({
            value: d.topicId,
            label: d.topicName,
        }))
    }
    return null
}

export const sortCourseMaterials = (materials) => {
    const sortedMaterials = []
    materials.forEach((element) => {
        if (sortedMaterials.length === 0) {
            sortedMaterials.push(element)
        } else {
            for (var i = 0; i < sortedMaterials.length; i++) {
                if (element.order < sortedMaterials[i].order) {
                    sortedMaterials.splice(i, 0, element)
                    break
                }
            }
            if (!sortedMaterials.includes(element)) {
                sortedMaterials.push(element)
            }
        }
    })
    return sortedMaterials
}
