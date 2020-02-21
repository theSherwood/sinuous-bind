// For setting up a cdn with all the directives

import {enableBind, registerProperty} from './bind'
import {bindArea} from './bindArea'
import {bindGroup} from './bindGroup'
import {bindMedia} from './bindMedia'

registerProperty(bindArea)
registerProperty(bindGroup)
registerProperty(bindMedia)

export {enableBind}