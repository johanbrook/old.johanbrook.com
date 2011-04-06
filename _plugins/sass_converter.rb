module Jekyll
  require 'haml'
  require 'sass'
  
  class SassConverter < Converter
    safe true
    priority :low

     def matches(ext)
      ext =~ /sass/i
    end

    def output_ext(ext)
      ".css"
    end

    def convert(content)
      begin
        engine = Sass::Engine.new(content)
        engine.render
        puts "Successfully rendered Sass"
      rescue StandardError => e
        puts "!!! SASS Error: " + e.message
      end
    end
  end
end