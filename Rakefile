#!/usr/bin/env rake

require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)

desc 'Validate a `*.sudoku` file'
task :run do
  require_relative 'lib/validator'

  filename = ARGV[1]

  begin
    raise 'Nepieciešams norādīt failu ar .sudoku faila tipu' unless File.extname(filename) == '.sudoku'

    sudoku_string = File.read(filename)
    print Validator.validate(sudoku_string)
  rescue TypeError => _e
    raise 'Nepieciešams norādīt faila nosaukumu'
  rescue Errno::ENOENT => _e
    raise 'Nepareizs faila nosaukums'
  end
end
