// For setting up a cdn with all the directives

import {enableBind, register} from './bind'
import {getBindArea} from './bindArea'
import {getBindGroup} from './bindGroup'
import {getBindMedia} from './bindMedia'

register(getBindArea)
register(getBindGroup)
register(getBindMedia)

export {enableBind}