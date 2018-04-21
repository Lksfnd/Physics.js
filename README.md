# Physics.js
This is a little Physics library I wrote for myself. As of now, there are the following features:

 - Entity creation
 - Global gravitation
 - Setting the speed
 - local velocity & acceleration of entities
	 - calculated using the mass of an object
 - Simple vector calculation

The library is not finished yet, so features like global acceleration (such as wind for example), as well as more accurate and realistic calculations will follow soon. One think I am not working on yet are collision models and hitboxes.
Feel free to hit me up with a pull request, if you find a mistake or improvement!

## Documentation
I'll put the documentation down here once the features work as intended.

## Current bugs

 - When entities come close to reaching 0 velocity after being applied the accelerations they suddenly start to accelerate by a huge amount.