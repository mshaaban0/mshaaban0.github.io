---
layout: post
title:  "How To Install SASS on Windows"
date:   2014-12-01 11:29:21
categories: article
description: "SASS is a CSS processor that can make your life easier and faster than any other CSS processors, Installing SASS on windows actually very easy, and here is a little guide how to install..."
---
SASS is a CSS processor that can make your life easier and faster than any other CSS processors, Installing SASS on windows actually very easy, and here is a little guide how to install it on windows.

### What to install

+ Install the latest version of Ruby find it here [Ruby Installer](http://rubyinstaller.org/downloads/)

### Installing Ruby

1. Accept the licence then press NEXT
<img src="/assets/media/sass-dec-2014-1.jpg" class="img-responsive" alt="">
2. Make sure you check “Add Ruby excutables to your PATH”, This will add ruby to your cmd.
<img src="/assets/media/sass-dec-2014-1.jpg" class="img-responsive" alt="">
3. Press Install Then Finish.
4. Check if ruby installed correctly, type :
{% highlight PowerShell linenos %}
ruby -v  #this should output something like the below
ruby 2.0.0p481
{% endhighlight %}

### Installing SASS With Gem :

+ Open cmd.
+ type the following CLI to install SASS
{% highlight shell %}
gem install sass
{% endhighlight %}
+ This should output :
{% highlight shell %}
Fetching: sass-3.4.2.gem (100%)
Successfully installed sass-3.4.2
Parsing documentation for sass-3.4.2
Installing ri documentation for sass-3.4.2
1 gem installed
{% endhighlight %}
+ Check if SASS installed :
{% highlight shell %}
sass -v
Sass 3.4.2
{% endhighlight %}

That should do it, now put sass into action and run it.

+ Navigate to your sass folder
{% highlight PowerShell linenos %}
cd /PATH/TO/SASS-FOLDER --watch style.scss:style.css
{% endhighlight %}

Boom now it's up and running.

