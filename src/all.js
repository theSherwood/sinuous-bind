// For setting up a cdn with all the directives

import {enableBind, registerProperty} from './bind/bind'
import {bindArea} from './bindArea/bindArea'
import {bindGroup} from './bindGroup/bindGroup'
import {bindMedia} from './bindMedia/bindMedia'

registerProperty(bindArea)
registerProperty(bindGroup)
registerProperty(bindMedia)

export {enableBind}